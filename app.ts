import 'reflect-metadata'

import dotenv from 'dotenv'
import { Container } from 'typedi'

import { MongoServiceProvider } from './server/mongo'
import { Server } from './server'

dotenv.config()

const server = new Server(Container.get(MongoServiceProvider))
server.run()
