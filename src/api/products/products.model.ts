import mongoose from "mongoose";
import crypto from "node:crypto";

import type { Product } from "./product/product.types";

export const productSchema = new mongoose.Schema({
  _id: { type: String, default: crypto.randomUUID },
  title: { type: String, required: true},
  description: {type: String, required: true},
  price: { type: Number, required: true},
}, {
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      // use id instead of _id in output
      ret.id = doc._id;

      // remove fields that skipped in response
      delete ret._id;
      delete ret.__v;
    }
  }
})

const ProductModel = mongoose.model<Product>("Product", productSchema)

export default ProductModel
