import { Notes } from '@prisma/client'
import { prisma } from '../../Utils/constants'

export class NotesService {
    async createNotes(note: Notes): Promise<Notes> {
        return await prisma.notes.create({ data: { ...note } })
    }

    async getNotesById(NotesId: number): Promise<Notes | null> {
        return await prisma.notes.findUnique({ where: { id: NotesId } })
    }

    async updateNotes(Notes: Notes): Promise<Notes> {
        const note = await prisma.notes.update({
            where: { id: Notes.id },
            data: { ...Notes },
        })
        return note
    }

    async deleteNotes(NotesId: number): Promise<void> {
        await prisma.notes.delete({ where: { id: NotesId } })
    }
}
