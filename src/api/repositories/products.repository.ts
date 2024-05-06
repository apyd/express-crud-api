import Product from "../models/products.model";
import { timestampsFieldsList } from "../constants";
import type { ProductId } from "../types/product.types";

export const getAll = async () => await Product.findAll({attributes: { exclude: timestampsFieldsList }})

export const getById = async (productId: ProductId) => await Product.findByPk(productId, {
    attributes: { exclude: timestampsFieldsList }
})