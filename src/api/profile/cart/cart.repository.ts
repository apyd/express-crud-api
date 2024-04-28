import { sequelize } from "../../db";
import Cart from "./cart.model";
import CartItems from "./cartItem/cartItem.model";
import Product from "../../products/products.model";

import { timestampsFieldsList } from "../../constants";

import type { CartItem } from "./cart.types";
import type { UserId } from "../profile.type";
import { Op } from "sequelize";

export const getCart = async (userId: UserId) => {
  let cart = await Cart.findOne({ 
    where: { userId, isDeleted: false },
    include: { 
      model: CartItems, 
      as: 'items',
      include: [{
        model: Product,
        as: 'product'
      }]
    },
    attributes: { exclude: timestampsFieldsList }
});
  if (!cart) {
    cart = await Cart.create({ userId });
    return {
      ...cart,
      items: []
    }
  }
  return cart;
};

export const updateCart = async (
  userId: UserId,
  items: CartItem[],
  total: number
) => {
  const transaction = await sequelize.transaction();
  
  try {
    // Update cart, if cart not found rollback transaction
    const [_, updatedRows] = await Cart.update(
      { total },
      { 
        where: { userId, isDeleted: false },
        returning: true,
        transaction
      });

    const cart = updatedRows?.[0];
    if (!cart) {
      transaction.rollback();
      return;
    }

    // Remove all items from the cartItems table that exists
    // in the cart items table but doesn't exist on updated items list
    await CartItems.destroy({
      where: { 
        cartId: cart.id,
        productId: {
          [Op.notIn]: items.map(item => item.product.id)
        }
      },
      transaction
    })

    // Add new items to the cartItems table
    for (const item of items) {
      await CartItems.upsert(
        {
          cartId: cart.id,
          productId: item.product.id,
          count: item.count
        }, 
        { transaction });
    }    

    await transaction.commit();

    const updatedCart = await getCart(userId);

    return updatedCart;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const deleteCart = async (userId: UserId) => {
  const cart = await Cart.update(
    { isDeleted: true },
    { where: { userId, isDeleted: false } }
  );
  if (!cart) {
    return false
  }
  return true
};
