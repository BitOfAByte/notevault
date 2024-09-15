import { Request } from 'express'

export interface CustomType {
    user: { id: number; name: string; email: string }
    body: Request['body']
}

export interface CustomRequest extends Request {
    user: CustomType
}
