import moment from 'moment'
import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { v4 as uuid } from 'uuid'

import DataProvider from '../../DataProvider'
import { Authorized, CanInviteUsers } from '../auth'
import { CurrentUser, RequestUserInfo } from '../decorators'
import { ServiceName, UserRegistrationInvitationService } from '../../services'
import { SubmitInvitationInputType } from '../inputTypes'
import { UserRegistrationInvitationType } from '../types'
import { UserRegistrationInvitationFields } from '../../models/UserRegistrationInvitation'
import { withNewModelFields } from '../../models/Model'

@Service()
@Resolver(UserRegistrationInvitationType)
class UserRegistrationInvitationResolver {
  constructor(
    @Inject(ServiceName.UserRegistrationInvitation)
    private readonly invitationService: UserRegistrationInvitationService,
  ) {}

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

  @Mutation(returns => UserRegistrationInvitationType)
  @Authorized(CanInviteUsers)
  public async submitRegistrationInvitation(
    @Arg('input') input: SubmitInvitationInputType,
    @CurrentUser() user: RequestUserInfo,
  ): Promise<UserRegistrationInvitationType> {
    const numDays = DataProvider.getAppSettingsMap().numDaysInvitationIsValid as number

    const fields: UserRegistrationInvitationFields = {
      email: input.email,
      invitationId: uuid(),
      invitedByUserId: user.id,
      expiresAt: moment().add(numDays, 'days').toDate(),
    }

    const invitation = await this.invitationService.insertOne(withNewModelFields(fields))
    return invitation.toGraphQLType()
  }
}

export default UserRegistrationInvitationResolver
