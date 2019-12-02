import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'

import { CampaignResolver } from './resolvers'

export async function getSchema(): Promise<GraphQLSchema> {
  return await buildSchema({
    container: Container,
    resolvers: [
      CampaignResolver,
    ],
  })
}
