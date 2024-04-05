export type CustomErrorType = {
    statusCode: number;
    message: string;
    name: string;
}

export class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number, name: string) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string) {
        super(message, 400, "BadRequestError");
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string) {
        super(message, 401, "UnauthorizedError");
    }
}

export class ForbiddenError extends CustomError {
    constructor(message: string) {
        super(message, 403, "ForbiddenError");
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, 404, "NotFoundError");
    }
}
