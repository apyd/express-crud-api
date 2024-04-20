import Product from "./products.model";
import { timestampsFieldsList } from "../constants";
import type { ProductId } from "./product/product.types";

export const getAll = async () => await Product.findAll()

export const getById = async (productId: ProductId) => await Product.findByPk(productId, {
    attributes: { exclude: timestampsFieldsList }
})