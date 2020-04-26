import { Container } from 'typedi'
import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'

import {
  AppSettingResolver,
  CampaignResolver,
  UserRegistrationInvitationResolver,
  UserRegistrationRequestResolver,
  UserResolver,
  UserRoleResolver,
} from './resolvers'

import { errorInterceptor } from './middleware'
import { verifyRegisteredServices } from '../services/util'

export function getSchema(): Promise<GraphQLSchema> {
  verifyRegisteredServices()

  return buildSchema({
    container: Container,
    globalMiddlewares: [errorInterceptor],
    resolvers: [
      AppSettingResolver,
      CampaignResolver,
      UserRegistrationInvitationResolver,
      UserRegistrationRequestResolver,
      UserResolver,
      UserRoleResolver,
    ],
  })
}
