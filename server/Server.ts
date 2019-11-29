import express from 'express'
import morgan from 'morgan'

class Server {
  public async run() {
    const app = express()
    const port = process.env.AR_PORT || 4000

    app.use(morgan('tiny'))

    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  }
}

export default Server
