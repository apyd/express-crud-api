import { Request, Response, NextFunction } from "express";
import { createOrderService } from "../services/checkout.service";
import { validateCheckout } from "../validators/checkout.validator";

import type { RequestOrderData } from "../types/checkout.types";
import type { UserId } from "../types/user.types";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user.id as UserId;
    const createOrderData: RequestOrderData = req.body;
    validateCheckout(createOrderData)
    const order = await createOrderService(userId, createOrderData);
    res.json({ data: order});
  } catch (error) {
    next(error);
  }
};
