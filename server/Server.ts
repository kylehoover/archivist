import cookieParser from 'cookie-parser'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import morgan from 'morgan'

import DataProvider from './DataProvider'
import { getEnv } from './Env'
import { getSchema } from './graphql'
import { getServiceProvider, registerServices } from './services/util'
import { verifyAccessToken } from './helpers/auth'

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

    app.use((req, res, next) => {
      const accessToken = req.headers.authorization?.split(' ')[1]
      let userInfo = null

      if (accessToken !== undefined) {
        try {
          const payload = verifyAccessToken(accessToken)

          userInfo = {
            id: payload.userId,
            roleId: payload.roleId,
            permissions: DataProvider.getUserRoleById(payload.roleId).permissions,
          }
        } catch (err) {
          console.log(err)
        }
      }

      req.user = userInfo
      next()
    })

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
