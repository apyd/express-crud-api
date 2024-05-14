import { Request, Response, NextFunction } from "express";
import { loginUserService, registerUserService } from "../services/user.service";
import { validateUser } from "../validators/user.validator";

import type { CreateUserRequestBody, LoginUserRequestBody } from "../types/user.types";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const registerUserData: CreateUserRequestBody = req.body;
    validateUser(registerUserData)
    const user = await registerUserService(registerUserData);
    res.json({
      data: user,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const loginUserData: LoginUserRequestBody = req.body;
    validateUser(loginUserData, 'login')
    const token = await loginUserService(loginUserData);
    res.json({
      data: token,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};
