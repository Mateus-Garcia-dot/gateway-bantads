import { Request, Response, NextFunction } from 'express'

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err)
    res.status(500).json({ message: err.message })
}

export { errorHandler }