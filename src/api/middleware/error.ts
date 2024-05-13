import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errors";

const DEFAULT_ERROR = {
  STATUS: 500,
  MESSAGE: "Internal Server Error",
};

export const errorHandler = (
  err: CustomError,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode, name, message } = err;
  if (statusCode && name) {
    return res.status(statusCode).json({
      data: null,
      error: {
        message: message,
      },
    });
  }
  return res.status(DEFAULT_ERROR.STATUS).json({
    data: null,
    error: {
      message: DEFAULT_ERROR.MESSAGE,
    },
  });
};
