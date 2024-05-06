import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';

import { BadRequestError } from "../utils/errors";
import { CurrentUser } from "../types/user.types";

export const authenticate = async (req: Request, _: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return new BadRequestError('Bad request. Missing token in headers.')
  }

  const [tokenType, token] = authHeader.split(' ');

  if (tokenType !== 'Bearer') {
    return new BadRequestError("Invalid Token")
  }
  
  try {
    const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY!) as CurrentUser
    req.user = user
  } catch (error) {
    next(error);
  }

  next();
};
