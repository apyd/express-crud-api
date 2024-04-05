import DB from "../../db";
import { Product, ProductId } from "./product/product.types";

export const getProducts = async (): Promise<Product[]> => {
  return new Promise((res, _) => {
    res(DB.get("products"));
  });
};

export const getProductById = (
  productId: ProductId
): Promise<Product | undefined> => {
  return new Promise((res, _) => {
    res(
      DB.get("products").find((product: Product) => product.id === productId)
    );
  });
};
