import { getCart } from './cart.repository';

import Checkout from '../models/checkout.model';
import Cart from '../models/cart.model';
import CartItems from "../models/cartItem.model";
import Product from "../models/products.model";

import type {  RequestOrderData } from "../types/checkout.types";
import type { UserId } from '../validators/profile.type';

import { timestampsFieldsList } from '../constants';

export const createOrder = async (userId: UserId, orderData: RequestOrderData) => {

  const cart = await getCart(userId);
  if (!cart) {
    return;
  }
  try {
    const order = await Checkout.create({
      userId: cart.userId,
      cartId: cart.id,
      payment: orderData.payment,
      delivery: orderData.delivery,
      comments: orderData.comments,
      status: orderData.status
    }, {
      include: [{ 
        model: CartItems, 
        as: 'items',
        include: [{
          model: Product,
          as: 'product'
        }]
      }, {
        model: Cart,
        as: 'total',
        total: cart.total
      }],
      attributes: { exclude: timestampsFieldsList }
    }
  )
    return order
  } catch (error) {
    console.error(error)
    throw error
  }
}
