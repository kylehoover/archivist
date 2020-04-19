import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'

import { Model } from '../../models'
import { ServiceName, UserRegistrationRequestService } from '../../services'
import { SubmitRegistrationRequestInputType } from '../inputTypes'
import { UserRegistrationRequestFields } from '../../models/UserRegistrationRequest'
import { UserRegistrationRequestType } from '../types'

@Service()
@Resolver(UserRegistrationRequestType)
class UserRegistrationRequestResolver {
  constructor(
    @Inject(ServiceName.UserRegistrationRequest)
    private readonly registrationRequestService: UserRegistrationRequestService,
  ) {}

  @Query(returns => UserRegistrationRequestType, { nullable: true })
  public async userRegistrationRequest(
    @Arg('id', type => ID) id: string,
  ): Promise<UserRegistrationRequestType | undefined> {
    const user = await this.registrationRequestService.findById(id)
    return user?.toGraphQLType()
  }

  @Query(returns => [UserRegistrationRequestType])
  public async userRegistrationRequests(): Promise<UserRegistrationRequestType[]> {
    const users = await this.registrationRequestService.findAll()
    return users.map(u => u.toGraphQLType())
  }

  @Mutation(returns => UserRegistrationRequestType)
  public async submitRegistrationRequest(
    @Arg('input') input: SubmitRegistrationRequestInputType,
  ): Promise<UserRegistrationRequestType> {
    throw new Error('submitRegistrationRequest not implemented, need to hash password')

    const registrationRequest = await this.registrationRequestService.insertOne(Model.getNewModelFields(input))
    return registrationRequest.toGraphQLType()
  }
}

export default UserRegistrationRequestResolver
