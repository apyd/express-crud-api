import { Request, Response, NextFunction } from "express";
import { getProductByIdService, getProductsService } from "../services/products.service";
import { validateId } from "../validators/id.validator";

import type { ProductId } from "../types/product.types";

export const getAllProducts = async (
  _: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await getProductsService();
    res.json({
      data: products,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productId = req.params.productId as ProductId;
    validateId(productId);
    const product = await getProductByIdService(productId);
    res.json({
      data: product,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};
