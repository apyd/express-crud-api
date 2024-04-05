import { Request, Response, NextFunction } from "express";
import { createOrderService } from "./checkout.service";
import schema from "./checkout.validator";
import { BadRequestError } from "../../../../utils/errors";

import type { RequestOrderData } from "./checkout.types";
import { UserId } from "../../profile.type";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as UserId;
    const createOrderData: RequestOrderData = req.body;
    const { error } = schema.validate(createOrderData)
    if (error) {
      throw new BadRequestError(error.message);
    }
    const order = await createOrderService(userId, createOrderData);
    res.json({ data: order});
  } catch (error) {
    next(error);
  }
};
