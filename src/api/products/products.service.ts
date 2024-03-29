import { getProducts, getProductById } from "./products.repository";
import { BadRequestError } from "../../utils/errors";

import type { Product, ProductId } from "./product/product.types";

export const getProductsService = async (): Promise<Product[]> => {
  return await getProducts();
};

export const getProductByIdService = async (
  productId: ProductId
): Promise<Product> => {
  const product = await getProductById(productId);
  if (!product) {
    throw new BadRequestError(`No product with such id`);
  }
  return product;
};
