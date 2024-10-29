import { statusCode } from '../types/statusCode';

class NotFoundError extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = statusCode.NOT_FOUND;
    }
}

export default NotFoundError;
