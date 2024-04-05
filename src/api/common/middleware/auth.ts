import { Request, Response, NextFunction } from "express";
import { BadRequestError, ForbiddenError, UnauthorizedError } from "../../utils/errors";
import { isUuidV4 } from "../../utils";

import type { UserId } from "../../profile/profile.type";

const authValidator = async (userId: UserId) => {
  // harcoded for now and returns true if userId is UUID
  return true;
};

export const auth = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const headerWithUserId = req.headers?.["x-user-id"] as UserId | undefined;

    if (!headerWithUserId) {
      throw new ForbiddenError("You must be authorized user");
    }

    if (!isUuidV4(headerWithUserId)) {
      throw new BadRequestError("Invalid UUID in x-user-id header");
    }

    const validUser = await authValidator(headerWithUserId as UserId);
    if (!validUser) {
      throw new UnauthorizedError("User is not authorized");
    }
  } catch (error) {
    next(error);
  }

  next();
};
