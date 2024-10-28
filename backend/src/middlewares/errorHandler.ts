import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../types/Error';

const errorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
    const { statusCode = 500, message = 'Internal Server Error' } = err;

    res.status(statusCode).send({
        message: statusCode === 500
            ? 'Internal Server Error'
            : message,
    });
};

export default errorHandler;
