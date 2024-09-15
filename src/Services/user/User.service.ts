import { User } from '@prisma/client'
import { prisma } from '../../Utils/constants'

export class UserService {
    async createUser(user: User): Promise<User> {
        return await prisma.user.create({ data: { ...user } })
    }

    async getUserById(userId: number): Promise<User | null> {
        return await prisma.user.findUnique({ where: { id: userId } })
    }

    async updateUser(user: User): Promise<User> {
        const usr = await prisma.user.update({
            where: { id: user.id },
            data: { ...user },
        })
        return usr
    }

    async deleteUser(userId: number): Promise<void> {
        await prisma.user.delete({ where: { id: userId } })
    }
}
