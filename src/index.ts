import 'dotenv/config'
import express from 'express'
import { prisma } from './Utils/constants'
import loggerMiddleware from './Middleware/logger.middleware'
import passport from 'passport'
import { UserController } from './Controllers/User.controller'
import { AuthController } from './auth/auth.controller'
;(async () => {
    const userController = new UserController()
    const authController = new AuthController()
    const app = express()
    app.use(express.json())
    app.use(loggerMiddleware('app'))
    app.use('/api', userController.routes)
    app.use('/api', authController.routes)
    app.use(passport.initialize())
    await prisma
        .$connect()
        .then(() => console.log('Connected to the database'))
        .catch((err: Error) => console.error(err.message))

    app.get('/', (_req, res) => res.send('Hello World!'))
    app.listen(process.env.PORT || 3001, (): void =>
        console.log('Server is running on port 3001')
    )
})()
