import { Request, Response, NextFunction } from "express";
import {
  getCartService,
  updateCartService,
  deleteCartService,
} from "./cart.service";

import type { Cart, UpdateCartRequestBody } from "./cart.types";
import type { UserId } from "../profile.type";
import { validateCart } from "./cart.validator";

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as UserId;
    const cart: Cart = await getCartService(userId);
    res.json({
      data: cart,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"] as UserId;
    const updateCartData: UpdateCartRequestBody = req.body;
    validateCart(updateCartData)
    const cart = await updateCartService(userId, updateCartData);
    res.json({
      data: cart,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers["x-user-id"];
    await deleteCartService(userId as UserId);
    res.json({
      data: {
        success: true,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};
