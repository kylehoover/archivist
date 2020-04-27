import cookieParser from 'cookie-parser'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import morgan from 'morgan'

import DataProvider from './DataProvider'
import { getEnv } from './Env'
import { getSchema } from './graphql'
import { getServiceProvider, registerServices } from './services/util'
import { parseAccessToken } from './middleware'

class Server {
  public async run(): Promise<void> {
    const serviceProvider = getServiceProvider()
    await serviceProvider.init()
    registerServices(serviceProvider)
    await DataProvider.init()

    const app = express()
    const port = process.env.PORT || getEnv().Port

    app.use(cookieParser())
    app.use(morgan('tiny'))
    app.use(parseAccessToken)

    app.use('/graphql', graphqlHTTP({
      graphiql: app.get('env') === 'development',
      schema: await getSchema(),
    }))

    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  }
}

export default Server
