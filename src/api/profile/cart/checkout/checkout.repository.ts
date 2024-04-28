import Checkout from './checkout.model';
import Cart from '../cart.model';
import CartItems from "../cartItem/cartItem.model";
import Product from "../../../products/products.model";

import type {  RequestOrderData } from "./checkout.types";
import type { UserId } from '../../profile.type';
import { getCart } from '../cart.repository';
import { timestampsFieldsList } from '../../../constants';

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
