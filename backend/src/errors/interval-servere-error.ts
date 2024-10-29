import { statusCode } from '../types/statusCode';

class IntervalServereError extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = statusCode.INTERNAL_SERVER_ERROR;
    }
}

export default IntervalServereError;
