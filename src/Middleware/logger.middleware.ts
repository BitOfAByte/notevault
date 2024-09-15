import { Request, Response, NextFunction } from 'express'
import LoggerService from '../Services/logger'
import chalk from 'chalk'

const loggerMiddleware = (route: string) => {
    const logger = new LoggerService(route)

    return async (req: Request, res: Response, next: NextFunction) => {
        // Log the request
        logger.info(chalk.green(`Incoming request`), {
            method: req.method,
            url: req.url,
            ip: req.ip,
            headers: req.headers,
        })

        // Capture the original end function
        const originalEnd = res.end

        // Override the end function
        res.end = function (
            this: Response,
            _chunk?: any,
            encoding?: string | (() => void)
        ) {
            // Log the response
            logger.info(chalk.green(`Outgoing response`), {
                method: req.method,
                url: req.url,
                statusCode: res.statusCode,
                statusMessage: res.statusMessage,
                headers: res.getHeaders(),
            })

            // Handle different function signatures
            if (typeof encoding === 'function') {
                encoding = undefined
            }

            // Call the original end function
            return originalEnd.apply(this, arguments as any)
        } as Response['end']

        next()
    }
}

export default loggerMiddleware
