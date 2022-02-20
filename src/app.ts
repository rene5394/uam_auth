import { dotenv } from '../config/env'
import express, { Application, json } from 'express'
import { loadControllers } from 'awilix-express'
import loadContainer from './container'
import cors from 'cors'

dotenv.config()

const app: Application = express()

app.disable('x-powered-by');

app.use(json())

app.use(cors())

loadContainer(app)

app.use(loadControllers(
    'controllers/*.ts',
    { cwd: __dirname }
))

export { app }