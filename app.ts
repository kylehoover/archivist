import 'reflect-metadata'

import dotenv from 'dotenv'

import { MongoServiceProvider } from './mongo'
import Server from './server/Server'

dotenv.config()

const server = new Server(new MongoServiceProvider())
server.run()
