import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../utils/errors";

export const authorizeAsAdmin = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  
  const user = req.user
  const { role } = user

  if(role !== 'admin') {
    throw new ForbiddenError('User is not authorized to perform this action.')
  }

  next();
};
