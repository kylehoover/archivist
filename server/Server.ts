import express from 'express'
import graphqlHTTP from 'express-graphql'
import morgan from 'morgan'

import { getSchema } from '../graphql'
import { ServiceProvider, registerServices } from '../services'

class Server {
  constructor(private readonly serviceProvider: ServiceProvider) {}

  public async run(): Promise<void> {
    await this.serviceProvider.init()
    registerServices(this.serviceProvider)

    const app = express()
    const port = process.env.AR_PORT || 4000

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
