import crypto from "node:crypto";

import Cart from "./cart.model";

import type { UpdateCartItem } from "./cart.types";
import type { UserId } from "../profile.type";
import type { Product } from "../../products/product/product.types";

export const getCart = async (userId: UserId) => {
  const cart = await Cart.findOne({ userId, isDeleted: false });
  if (!cart) {
    const newCart = new Cart({
      id: crypto.randomUUID(),
      userId,
      isDeleted: false,
      items: [],
    });
    await newCart.save();
    return newCart;
  }
  return cart;
}


export const updateCart = async (
  userId: UserId,
  updateCartData: UpdateCartItem[],
  products: Product[] | []
) => {
  const cart = await Cart.findOne({ userId, isDeleted: false });
  if (!cart) {
    return;
  }
  const mappedProducts = products.map((product, index) => {
    return {
      product,
      count: updateCartData[index].count,
    };
  });
  cart.items = mappedProducts;
  await cart.save();
  return cart;
}
  
export const deleteCart = async (userId: UserId) => {
  const cart = await Cart.findOne({ userId, isDeleted: false });
  if (!cart) {
    return;
  }
  cart.isDeleted = true;
  await cart.save();
  return cart;
};
