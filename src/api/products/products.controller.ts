import { Request, Response, NextFunction } from "express";
import { getProductByIdService, getProductsService } from "./products.service";

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
    const productId = req.params.productId;
    const product = await getProductByIdService(productId);
    res.json({
      data: product,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};
