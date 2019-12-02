import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'

import { CampaignResolver } from './resolvers'
import { verifyRegisteredServices } from './services'

export function getSchema(): Promise<GraphQLSchema> {
  verifyRegisteredServices()

  return buildSchema({
    container: Container,
    resolvers: [
      CampaignResolver,
    ],
  })
}
