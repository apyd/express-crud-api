import mongoose from "mongoose";

import type { Product } from "./product/product.types";

export const productSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.UUID,
  title: String,
  description: String,
  price: Number
})

const ProductModel = mongoose.model<Product>("Product", productSchema)

export default ProductModel
