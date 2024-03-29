import { Request, Response, NextFunction } from "express";
import checkoutSchema from "../../profile/cart/checkout/checkout.validator";
import cartSchema from "../../profile/cart/cart.validator";
import idParamSchema from "../../profile/cart/checkout/checkout.validator";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { error } = idParamSchema.validate(req.params.id);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateCheckout = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = checkoutSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateCart = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = cartSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
