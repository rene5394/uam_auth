import { NextFunction, Request, Response } from 'express'
import { POST, route } from 'awilix-express'
import { AuthService } from '../services/auth.service'
import validator from 'validator'
import { userAuthenticateDto } from '../dtos/user.dto'

export default class AuthController {
    constructor(
        private readonly authService: AuthService 
    ) {}

    @route('/login')
    @POST()
    public async authenticate(req: Request, res: Response): Promise<void> {
        try {
            const email = req.body.email
            const password = req.body.password

            if (!validator.isEmpty(email) && !validator.isEmpty(password)
                && validator.isEmail(email)) {
                const result = await this.authService.authenticate({
                    email: email,
                    password: password
                } as userAuthenticateDto)
                
                res.status(200)
                res.send(result)

                return
            }

            res.status(400)
            res.send('Bad request')

            return
        } catch (error) {
            res.status(404)
            res.send(`${error}`)
            
            return
        }
    }
}