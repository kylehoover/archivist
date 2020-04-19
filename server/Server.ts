import express from 'express'
import graphqlHTTP from 'express-graphql'
import morgan from 'morgan'

import DataProvider from './DataProvider'
import { getSchema } from './graphql'
import { getServiceProvider, registerServices } from './services/util'

class Server {
  public async run(): Promise<void> {
    const serviceProvider = getServiceProvider()
    await serviceProvider.init()
    registerServices(serviceProvider)
    await DataProvider.init()

    const app = express()
    const port = process.env.AR_PORT ?? 4000

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
