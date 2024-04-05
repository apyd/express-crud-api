import Product from "./products.model";
import type { ProductId } from "./product/product.types";

export const getAll = async () => await Product.find({})

export const getById = async (productId: ProductId) => await Product.findById(productId)