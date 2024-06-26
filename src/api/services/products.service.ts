import { getAll, getById } from "../repositories/products.repository";
import { BadRequestError } from "../utils/errors";

import type { ProductId } from "../types/product.types";

export const getProductsService = async () => {
  return await getAll()
};

export const getProductByIdService = async (
  productId: ProductId
) => {
  const product = await getById(productId)
  if (!product) {
    throw new BadRequestError(`No product with such id`);
  }
  return product;
};
