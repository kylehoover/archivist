import { ArgumentValidationError, MiddlewareFn, buildSchema } from 'type-graphql'
import { Container } from 'typedi'
import { GraphQLError, GraphQLSchema } from 'graphql'

import {
  AppSettingResolver,
  CampaignResolver,
  UserRegistrationInvitationResolver,
  UserRegistrationRequestResolver,
  UserResolver,
  UserRoleResolver,
} from './resolvers'
import { verifyRegisteredServices } from '../services/util'

const errorInterceptor: MiddlewareFn = async ({ context, info }, next) => {
  try {
    return await next()
  } catch (err) {
    if (err instanceof ArgumentValidationError) {
      const extensions = { validationErrors: err.validationErrors }
      throw new GraphQLError(err.message, undefined, undefined, undefined, undefined, undefined, extensions)
    }

    throw err
  }
}

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
