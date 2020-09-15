import moment from 'moment'
import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { v4 as uuid } from 'uuid'

import DataProvider from '../../DataProvider'
import { Authorized, CurrentUser } from '../decorators'
import { CanInviteUsers, validateEmailIsAvailable } from '../auth'
import { RequestUserInfo, UserRegistrationInvitationFields, withNewModelFields } from '../../models'
import { ServiceName, UserRegistrationInvitationService, UserService } from '../../services'
import { getNormalizedEmail } from '../../helpers'

import {
  AcceptInvitationInputType,
  ResponseType,
  SubmitInvitationInputType,
  UserRegistrationInvitationType,
} from '../types'

@Service()
@Resolver(UserRegistrationInvitationType)
class UserRegistrationInvitationResolver {
  constructor(
    @Inject(ServiceName.UserRegistrationInvitation)
    private readonly invitationService: UserRegistrationInvitationService,
    @Inject(ServiceName.User)
    private readonly userService: UserService,
  ) {}

  // Queries //

  @Query(returns => UserRegistrationInvitationType, { nullable: true })
  public async userRegistrationInvitation(
    @Arg('id', type => ID) id: string,
  ): Promise<UserRegistrationInvitationType | undefined> {
    const user = await this.invitationService.findById(id)
    return user?.toGraphQLType()
  }

  @Query(returns => [UserRegistrationInvitationType])
  public async userRegistrationInvitations(): Promise<UserRegistrationInvitationType[]> {
    const users = await this.invitationService.findAll()
    return users.map(u => u.toGraphQLType())
  }

  // Mutations //

  @Mutation(returns => ResponseType)
  public async acceptRegistrationInvitation(
    @Arg('input') input: AcceptInvitationInputType,
  ): Promise<ResponseType> {
    throw new Error('acceptRegistrationInvitation not implemented')
  }

  @Mutation(returns => UserRegistrationInvitationType)
  @Authorized(CanInviteUsers)
  public async submitRegistrationInvitation(
    @Arg('input') input: SubmitInvitationInputType,
    @CurrentUser() userInfo: RequestUserInfo,
  ): Promise<UserRegistrationInvitationType> {
    const email = getNormalizedEmail(input.email)
    await validateEmailIsAvailable(email, this.userService)

    const numDays = DataProvider.getAppSettingsMap().numDaysInvitationIsValid as number

    const fields: UserRegistrationInvitationFields = {
      email,
      invitationId: uuid(),
      invitedByUserId: userInfo.userId,
      expiresAt: moment().add(numDays, 'days').toDate(),
    }

    const invitation = await this.invitationService.insertOne(withNewModelFields(fields))
    return invitation.toGraphQLType()
  }
}

export default UserRegistrationInvitationResolver
