import mongoose from "mongoose";

import type { Cart } from "./cart.types";

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    count: Number
})

const schema = new mongoose.Schema({
    id: mongoose.Schema.Types.UUID,
    userId: mongoose.Schema.Types.UUID,
    isDeleted: Boolean,
    items: [cartItemSchema]
})

const CartModel = mongoose.model<Cart>("Cart", schema)

export default CartModel
