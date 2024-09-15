import { PrismaClient } from '@prisma/client'
import '../auth/passport'
import { Router, Response } from 'express'
import { CustomType } from 'src/Utils/types/CustomType'
import passport from 'passport'

export class NoteController {
    private readonly router: Router = Router()
    private readonly database: PrismaClient = new PrismaClient()

    public get routes(): Router {
        this.router.post(
            '/notes/create',
            passport.authenticate('jwt', { session: false }),
            this.create.bind(this)
        )
        this.router.get(
            '/notes/:id',
            passport.authenticate('jwt', { session: false }),
            this.getNote.bind(this)
        )

        return this.router
    }

    private async create(req: CustomType, res: Response) {
        const user = await this.database.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, email: true },
        })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
    }
    private async getNote(req: CustomType, res: Response) {
        const note = await this.database.notes.findUnique({
            where: { id: Number(req.params.id) },
        })

        if (!note) {
            return res.status(404).json({ message: 'Note not found' })
        }

        return res.json(note)
    }
}
