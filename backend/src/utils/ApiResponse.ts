import { Response } from "express";

export const ApiResponse = (
    res: Response,
    statusCode: number,
    success: boolean,
    message: string | undefined = undefined,
    data: object | undefined = undefined
): Response => {
    return res.status(statusCode).json({
        success,
        message,
        data
    })
}