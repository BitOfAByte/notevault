import { UserService } from '../Services/user/User.service'
import { Router } from 'express'

export class UserController {
    private userService: UserService
    private readonly route: Router = Router()

    constructor() {
        this.userService = new UserService() // Initialize the userService
    }

    public get routes(): Router {
        this.route.post('/users/create', async (req, res) => {
            const user = await this.userService.createUser(req.body)
            res.json(user)
        })

        this.route.get('/user/:id', async (req, res) => {
            const user = await this.userService.getUserById(
                Number(req.params.id)
            )
            res.json(user)
        })

        this.route.put('/users/update/:id', async (req, res) => {
            const user = await this.userService.updateUser(req.body)
            res.json(user)
        })

        this.route.delete('/users/delete/:id', async (req, res) => {
            await this.userService.deleteUser(Number(req.params.id))
            res.json({ message: 'User deleted successfully' })
        })

        return this.route
    }
}
