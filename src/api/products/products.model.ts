import mongoose from "mongoose";
import crypto from "node:crypto";

import type { Product } from "./product/product.types";

export const productSchema = new mongoose.Schema({
  _id: { type: String, default: crypto.randomUUID },
  title: { type: String, required: true},
  description: {type: String, required: true},
  price: { type: Number, required: true},
})

const ProductModel = mongoose.model<Product>("Product", productSchema)

export default ProductModel
