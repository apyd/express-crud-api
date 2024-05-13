import { sequelize } from "../db";
import { deleteCart, getCart } from './cart.repository';

import Checkout from '../models/checkout.model';
import Cart from '../models/cart.model';
import CartItems from "../models/cartItem.model";
import Product from "../models/products.model";

import type {  RequestOrderData } from "../types/checkout.types";
import type { UserId } from '../validators/profile.type';

import { timestampsFieldsList } from '../constants';
import PaymentModel from '../models/payment.model';
import DeliveryModel from '../models/delivery.model';
import { randomUUID } from "crypto";

export const createOrder = async (userId: UserId, orderData: RequestOrderData) => {

  const { payment, delivery } = orderData

  const cart = await getCart(userId);
  if (!cart) {
    return;
  }

  const transaction = await sequelize.transaction();

  const newOrderId = randomUUID();

  console.log({ userId , id: cart.id})

  try {
    const order = await Checkout.create({
      id: newOrderId,
      userId: cart.userId,
      cartId: cart.id,
      comments: orderData.comments,
      status: orderData.status
    }, {
      include: [{ 
        model: CartItems, 
        as: 'items',
        include: [{
          model: Product,
          as: 'product',
        }]
      }, {
        model: Cart,
        as: 'total',
        total: cart.total,
      }
    ],
    }
  )

    await PaymentModel.create({ ...payment, checkoutId: newOrderId }, { transaction })
    await DeliveryModel.create({ ...delivery, checkoutId: newOrderId }, { transaction })

    const createdCheckout = Checkout.findByPk(order.id, {
        include: [{ 
          model: CartItems, 
          as: 'items',
          include: [{
            model: Product,
            as: 'product',
            attributes: { exclude: timestampsFieldsList }
          }]
        }, {
          model: Cart,
          as: 'total',
          attributes: { exclude: timestampsFieldsList }
        },
        {
          model: PaymentModel,
          as: 'payment',
          attributes: { exclude: timestampsFieldsList }
        },
        {
          model: DeliveryModel,
          as: 'delivery',
          attributes: { exclude: timestampsFieldsList }
        },
      ],
        attributes: { exclude: timestampsFieldsList }
    })

    await deleteCart(userId)

    await transaction.commit()

    return createdCheckout
  } catch (error) {
    await transaction.rollback()
    console.error(error)
    throw error
  }
}
