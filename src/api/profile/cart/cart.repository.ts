import crypto from "node:crypto";

import Cart from "./cart.model";

import type { CartItem } from "./cart.types";
import type { UserId } from "../profile.type";

export const getCart = async (userId: UserId) => {
  const cart = await Cart.findOne({ userId, isDeleted: false });
  if (!cart) {
    const newCart = new Cart({
      id: crypto.randomUUID(),
      userId,
      isDeleted: false,
      items: [],
      total: 0
    });
    await newCart.save();
    return newCart;
  }
  return cart;
}


export const updateCart = async (
  userId: UserId,
  items: CartItem[],
  total: number
) =>  {
  const cart = await Cart.findOne({ userId, isDeleted: false });
  if (!cart) {
    return;
  }
  cart.items = items;
  cart.total = total;
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
