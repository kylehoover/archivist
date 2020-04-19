import bcrypt from 'bcrypt'
import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'

import { Model } from '../../models'
import { ServiceName, UserRegistrationRequestService } from '../../services'
import { SubmitRegistrationRequestInputType } from '../inputTypes'
import { UserRegistrationRequestFields } from '../../models/UserRegistrationRequest'
import { UserRegistrationRequestType } from '../types'
import { getEnv } from '../../Env'

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
    const hash = await bcrypt.hash(input.password, getEnv().saltRounds)

    const fields: UserRegistrationRequestFields = {
      name: input.name,
      email: input.email,
      password: hash,
    }

    const registrationRequest = await this.registrationRequestService.insertOne(Model.getNewModelFields(fields))
    return registrationRequest.toGraphQLType()
  }
}

export default UserRegistrationRequestResolver
