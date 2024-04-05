import mongoose from "mongoose";

import type { Order } from "./checkout.types";

const schema = new mongoose.Schema({
    id: mongoose.Schema.Types.UUID,
    userId: mongoose.Schema.Types.UUID,
    cartId: mongoose.Schema.Types.UUID,
    items: {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      count: Number
    },
    payment: {
        type: String,
        address: mongoose.Schema.Types.Mixed,
        creditCard: mongoose.Schema.Types.Mixed,
    },
    delivery: {
        type: String,
        address: mongoose.Schema.Types.Mixed,
    },
    comments: String,
    status: { type: String, enum: ["created", "completed"] },
    total: Number
})

const CheckoutModel = mongoose.model<Order>("Checkout", schema)

export default CheckoutModel
