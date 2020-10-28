import { Container } from 'typedi'
import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'
import { errorInterceptor } from './middleware'
import { verifyRegisteredServices } from '../services/util'
import {
  AppSettingResolver,
  CampaignResolver,
  RaceResolver,
  UserRegistrationInvitationResolver,
  UserRegistrationRequestResolver,
  UserResolver,
  UserRoleResolver,
} from './resolvers'

export function getSchema(): Promise<GraphQLSchema> {
  verifyRegisteredServices()

  return buildSchema({
    container: Container,
    globalMiddlewares: [errorInterceptor],
    resolvers: [
      AppSettingResolver,
      CampaignResolver,
      RaceResolver,
      UserRegistrationInvitationResolver,
      UserRegistrationRequestResolver,
      UserResolver,
      UserRoleResolver,
    ],
  })
}
