import crypto from "node:crypto";

import DB from "../../../db";

import type { Cart, CartItem, UpdateCartItem } from "./cart.types";
import type { UserId } from "../profile.type";
import type { Product } from "../../products/product/product.types";

export const getCart = async (userId: UserId): Promise<Cart> => {
  return new Promise((res, _) => {
    let cart: Cart = DB.get("carts").find(
      (cart: Cart) => cart.userId === userId && !cart.isDeleted
    );
    if (!cart) {
      cart = {
        id: crypto.randomUUID(),
        userId,
        isDeleted: false,
        items: [],
      };
      DB.get("carts").push(cart);
    }
    return res(cart);
  });
};

export const updateCart = async (
  userId: UserId,
  updateCartData: UpdateCartItem[],
  products: Product[] | []
): Promise<Cart | null> => {
  return new Promise(async (res, _) => {
    const carts: Cart[] = DB.get("carts");
    const cartIndex = carts.findIndex(
      (cart: Cart) => cart.userId === userId && !cart.isDeleted
    );
    if (cartIndex === -1) {
      return res(null);
    }

    const mappedProducts: CartItem[] = products.map(
      (product: Product, index) => {
        return {
          product,
          count: updateCartData[index].count,
        };
      }
    );

    carts[cartIndex] = {
      ...carts[cartIndex],
      items: [...mappedProducts],
    };

    return res({ ...carts[cartIndex] });
  });
};

export const deleteCart = async (userId: UserId): Promise<Cart | null> => {
  return new Promise((res, _) => {
    const carts: Cart[] = DB.get("carts");
    const cartIndex = carts.findIndex(
      (cart: Cart) => cart.userId === userId && !cart.isDeleted
    );

    if (cartIndex === -1) {
      res(null);
    }

    carts[cartIndex] = {
      ...carts[cartIndex],
      items: [],
      isDeleted: true,
    };
    res({ ...carts[cartIndex] });
  });
};
