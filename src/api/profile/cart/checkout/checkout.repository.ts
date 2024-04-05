import crypto from 'node:crypto'

import Checkout from './checkout.model';
import Cart from '../cart.model';

import type {  RequestOrderData } from "./checkout.types";
import type { UserId } from '../../profile.type';

export const createOrder = async (userId: UserId, orderData: RequestOrderData) => {
  const cart = await Cart.findOne({ userId, isDeleted: false });
  if (!cart) {
    return;
  }

  const order = await Checkout.create({
    id: crypto.randomUUID(),
    userId: cart.userId,
    cartId: cart.id,
    items: cart.items,
    payment: orderData.payment,
    delivery: orderData.delivery,
    comments: orderData.comments,
    status: orderData.status,
    total: orderData.total,
  
  })
  return order
};
