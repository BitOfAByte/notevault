import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import '../auth/passport'
import { Router, Request, Response } from 'express'
import { CustomType } from 'src/Utils/types/CustomType'

export class AuthController {
    private readonly router: Router = Router()
    private readonly database: PrismaClient = new PrismaClient()

    public get routes(): Router {
        this.router.post('/auth/login', this.login.bind(this))
        this.router.get(
            '/auth/me',
            passport.authenticate('jwt', { session: false }),
            this.getMe.bind(this)
        )
        return this.router
    }

    private async login(req: Request, res: Response) {
        const { email, password } = req.body
        const user = await this.database.user.findUnique({ where: { email } })

        if (!user || user.password !== password) {
            return res
                .status(401)
                .json({ message: 'Invalid email or password' })
        }

        const jwtSecret = process.env.JWT_SECRET
        if (!jwtSecret) {
            console.error('JWT_SECRET is not set')
            return res.status(500).json({ message: 'Internal server error' })
        }

        const accessToken = jwt.sign({ id: user.id }, jwtSecret, {
            expiresIn: '15min',
        })

        const refreshToken = jwt.sign({ id: user.id }, jwtSecret, {
            expiresIn: '7d',
        })
        return res.json({
            message: 'Login successful',
            accessToken,
            refreshToken,
        })
    }

    private async getMe(req: CustomType, res: Response) {
        const user = await this.database.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, email: true },
        })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        return res.json({ user })
    }
}
