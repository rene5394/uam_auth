import { Application } from 'express'
import { asClass, createContainer } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import { AuthService } from './services/auth.service'

export default (app: Application): void => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    })

    container.register({
        // Services
        authService: asClass(AuthService).scoped()
    })

    app.use(scopePerRequest(container))
}