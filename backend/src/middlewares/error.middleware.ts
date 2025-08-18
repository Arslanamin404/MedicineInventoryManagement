import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    status?: number;
    details?: any;
}

export function errorHandler(
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';


    res.status(status).json({
        success: false,
        error: {
            message,
            details: err.details || null,
        },
    });
}