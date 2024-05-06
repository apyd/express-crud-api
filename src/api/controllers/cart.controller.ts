import { Request, Response, NextFunction } from "express";
import {
  getCartService,
  updateCartService,
  deleteCartService,
} from "../services/cart.service";

import type { UpdateCartRequestBody } from "../types/cart.types";
import type { UserId } from "../types/user.types";
import { validateCart } from "../validators/cart.validator";

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user.id
    const cart = await getCartService(userId);
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
    const userId = req.user.id as UserId;
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
    const userId = req.user.id as UserId;
    await deleteCartService(userId);
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
