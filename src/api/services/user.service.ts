import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { ForbiddenError, NotFoundError } from "../utils/errors";

import type {
  CreateUserRequestBody,
  LoginUserRequestBody,
} from "../types/user.types";
import { getUserByEmail, registerUser } from "../repositories/user.repository";

export const registerUserService = async (userData: CreateUserRequestBody) => {
  const { email, password } = userData;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return new ForbiddenError("Email already in use. Please login instead.");
  }

  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_LENGTH!));

  const registeredUser = await registerUser({
    ...userData,
    password: hashedPassword,
  });
  return registeredUser;
};

export const loginUserService = async (userData: LoginUserRequestBody) => {
  const { email, password } = userData;
  const user = await getUserByEmail(email);

  if (!user) {
    return new NotFoundError("No user with such email or password");
  }

  const validPassword = bcrypt.compare(password, user.password);

  if (!validPassword) {
    return new NotFoundError("No user with such email or password");
  }

  const token = jwt.sign(
    { userId: user.id, email, role: user.role },
    process.env.JWT_PRIVATE_KEY!,
    {
      expiresIn: process.env.KEY_EXPIRATION_LENGTH,
    }
  );

  return {
    token,
  };
};
