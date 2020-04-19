import moment from 'moment'
import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { v4 as uuid } from 'uuid'

import DataProvider from '../../DataProvider'
import { Model } from '../../models'
import { ServiceName, UserRegistrationInvitationService } from '../../services'
import { SubmitInvitationInputType } from '../inputTypes'
import { UserRegistrationInvitationType } from '../types'
import { UserRegistrationInvitationFields } from '../../models/UserRegistrationInvitation'

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
  public async submitRegistrationInvitation(
    @Arg('input') input: SubmitInvitationInputType
  ): Promise<UserRegistrationInvitationType> {
    throw new Error('submitRegistrationInvitation not implemented, need to get invitedByUserId from ctx')

    const numDays = DataProvider.getAppSettingsMap().numDaysInvitationIsValid as number

    const fields: UserRegistrationInvitationFields = {
      email: input.email,
      invitationId: uuid(),
      invitedByUserId: '1',
      expiresAt: moment().add(numDays, 'days').toDate(),
    }

    await this.invitationService.insertOne(Model.getNewModelFields(fields))
  }
}

export default UserRegistrationInvitationResolver
