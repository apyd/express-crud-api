import { Request, Response, NextFunction } from "express";
import { createOrderService } from "./checkout.service";
import { validateCheckout } from "./checkout.validator";

import type { RequestOrderData } from "./checkout.types";
import type { UserId } from "../../profile.type";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as UserId;
    const createOrderData: RequestOrderData = req.body;
    validateCheckout(createOrderData)
    const order = await createOrderService(userId, createOrderData);
    res.json({ data: order});
  } catch (error) {
    next(error);
  }
};
