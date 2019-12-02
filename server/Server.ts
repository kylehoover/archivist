import express from 'express'
import graphqlHTTP from 'express-graphql'
import morgan from 'morgan'
import { Container } from 'typedi'
import MongoCampaignService from '../database/MongoCampaignService'

import { getSchema } from '../graphql/schema'

class Server {
  public async run(): Promise<void> {
    const app = express()
    const port = process.env.AR_PORT || 4000
    Container.set('service.campaign', new MongoCampaignService())

    app.use(morgan('tiny'))

    app.use('/graphql', graphqlHTTP({
      graphiql: true,
      schema: await getSchema(),
    }))

    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  }
}

export default Server
