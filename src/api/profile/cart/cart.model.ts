import crypto from "node:crypto";
import mongoose from "mongoose";

import type { Cart } from "./cart.types";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  count: Number,
}, {
  _id: false,
  versionKey: false,
}
);

const schema = new mongoose.Schema({
  _id: { type: String, default: crypto.randomUUID },
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  items: { type: [cartItemSchema], default: [], required: true},
  total: { type: Number, default: 0, min: 0}
}, {
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      // use id instead of _id in output
      ret.id = doc._id;

      // remove fields that skipped in response
      delete ret._id;
      delete ret.__v;
      delete ret.userId
      delete ret.isDeleted;
    }
  }
});

const CartModel = mongoose.model<Cart>("Cart", schema);

export default CartModel;

