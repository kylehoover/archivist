import 'reflect-metadata'

import dotenv from 'dotenv'
import { Container } from 'typedi'

import { MongoServiceProvider } from './mongo'
import Server from './server/Server'

dotenv.config()

const server = new Server(Container.get(MongoServiceProvider))
server.run()
