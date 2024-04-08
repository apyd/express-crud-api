import crypto from 'node:crypto'
import mongoose from "mongoose";

import type { Order } from "./checkout.types";

const itemSchema = new mongoose.Schema({
    product: {
        type: String,
        ref: "Product",
    },
    count: Number,
}, {
  _id: false,
  versionKey: false,
});

const schema = new mongoose.Schema({
    _id: { type: String, default: crypto.randomUUID },
    userId: { type: String, required: true },
    cartId: { type: String, required: true },
    items: { type: [itemSchema], default: [], required: true },
    payment: {
        type: { type: String, required: true },
        address: { type: mongoose.Schema.Types.Mixed },
        creditCard: { type: mongoose.Schema.Types.Mixed }
    },
    delivery: {
        type: { type: String, required: true },
        address: { type: mongoose.Schema.Types.Mixed, required: true },
    },
    comments: { type: String, required: true },
    status: { type: String, enum: ["created", "completed"] },
    total: Number
}, {
  toJSON: {
    transform: function (doc, ret) {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
    }
  }
})

const CheckoutModel = mongoose.model<Order>("Checkout", schema)

export default CheckoutModel
