import crypto from 'node:crypto'

import DB from "../../../../db";

import type { Cart } from "../cart.types";
import type { Order, RequestOrderData } from "./checkout.types";
import type { UserId } from '../../profile.type';

export const createOrder = (userId: UserId, orderData: RequestOrderData): Promise<Order | null> => {
  return new Promise((res, _) => {
    const cart = DB.get('carts').find((cart: Cart) => cart.userId === userId && !cart.isDeleted);
    if(!cart || cart.items.length === 0) {
      res(null)
    }
    res({
      id: crypto.randomUUID(),
      userId: cart.userId,
      cartId: cart.id,
      items: cart.items,
      payment: orderData.payment,
      delivery: orderData.delivery,
      comments: orderData.comments,
      status: orderData.status,
      total: orderData.total,
    });
  });
};
