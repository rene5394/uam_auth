import connectionPool from '../common/persistence/mariadb'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { userAuthenticateDto } from '../dtos/user.dto'

export class AuthService {
    async authenticate(auth: userAuthenticateDto): Promise<string>  {
        const connection = connectionPool
        let matchPassword = false

        const [users]: any[] = await connection.execute(
            'SELECT * FROM users WHERE email = ?',
            [auth.email]
        )

        if (users[0]) {
            let hash = users[0].password
            hash = hash.replace(/^\$2y(.+)$/i, '$2a$1')
            matchPassword = await bcrypt.compare(auth.password, hash)

            if (matchPassword && process.env.jwt_secret_key) {
                const secretKey: string = process.env.jwt_secret_key

                try {
                    return jwt.sign({
                        id: users[0].id,
                        email: users[0].email
                    }, secretKey, { expiresIn: '7h', algorithm: 'HS256'})
                } catch (error) {
                    console.error(error)
                }  
            }
        } 

        throw new Error('Invalid user credentials')
    }
}