import { dotenv } from '../config/env'
import express, { Application, json } from 'express'
import cookieParser from 'cookie-parser'
import { loadControllers } from 'awilix-express'
import loadContainer from './container'
import cors from 'cors'

dotenv.config()

const app: Application = express()

app.use(json())

app.use(cookieParser())

app.use(cors())

loadContainer(app)

app.use(loadControllers(
    'controllers/*.ts',
    { cwd: __dirname }
))

export { app }