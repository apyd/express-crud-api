import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';

import { BadRequestError } from "../utils/errors";
import { CurrentUser } from "../types/user.types";

export const authenticate = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
      throw new BadRequestError('Bad request. Missing token in headers.')
    }
  
    const [tokenType, token] = authHeader.split(' ');
  
    if (tokenType !== 'Bearer') {
      throw new BadRequestError("Invalid Token")
    }

    const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY!) as CurrentUser
    req.user = user
  } catch (error) {
    next(error);
  }

  next();
};
