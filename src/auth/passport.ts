import { Strategy, ExtractJwt } from 'passport-jwt'
import passport, { DoneCallback } from 'passport'
import { prisma } from '../Utils/constants'
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || '',
}

passport.use(
    new Strategy(opts, async (payload: any, done: DoneCallback) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: payload.id,
                    email: payload.email,
                    name: payload.name,
                },
            })
            if (user) return done(null, user)
        } catch (error) {
            return done(error, null)
        }
    })
)
