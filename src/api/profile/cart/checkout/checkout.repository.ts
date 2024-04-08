import Checkout from './checkout.model';
import Cart from '../cart.model';

import type {  RequestOrderData } from "./checkout.types";
import type { UserId } from '../../profile.type';

export const createOrder = async (userId: UserId, orderData: RequestOrderData) => {
  const cart = await Cart.findOne({ userId, isDeleted: false });
  if (!cart) {
    return;
  }
  try {
    const order = await Checkout.create({
      userId: cart.userId,
      cartId: cart.id,
      items: cart.items,
      payment: orderData.payment,
      delivery: orderData.delivery,
      comments: orderData.comments,
      status: orderData.status,
      total: cart.total,
    })
    return order
  } catch (error) {
    console.error(error)
    throw error
  }
}
