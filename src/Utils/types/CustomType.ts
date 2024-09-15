import { Request } from 'express'

export interface CustomType {
    user: { id: number; name: string; email: string }
    body: Request['body']
    params: Request['params']
}

export interface CustomRequest extends Request {
    user: CustomType
}
