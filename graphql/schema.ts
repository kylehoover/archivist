import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'

import { verifyRegisteredServices } from '../services'
import { CampaignResolver } from './resolvers'

export function getSchema(): Promise<GraphQLSchema> {
  verifyRegisteredServices()

  return buildSchema({
    container: Container,
    resolvers: [
      CampaignResolver,
    ],
  })
}
