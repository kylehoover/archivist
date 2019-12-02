import express from 'express'
import graphqlHTTP from 'express-graphql'
import morgan from 'morgan'

import MongoCampaignService from '../database/MongoCampaignService'
import { getSchema } from '../graphql'
import { ICampaignService, IServiceProvider, registerServices } from '../graphql/services'

class Server {
  public async run(): Promise<void> {
    const app = express()
    const port = process.env.AR_PORT || 4000

    app.use(morgan('tiny'))

    const sp: IServiceProvider = {
      getCampaignService(): ICampaignService {
        return new MongoCampaignService()
      },
    }

    registerServices(sp)

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
