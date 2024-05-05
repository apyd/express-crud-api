import { getProductByIdService } from "../../products/products.service";
import { getCart, updateCart, deleteCart } from "./cart.repository";
import { BadRequestError, NotFoundError } from "../../utils/errors";

import type { CartResponse, UpdateCartRequestBody } from "./cart.types";
import type { UserId } from "../profile.type";
import type { Product } from "../../products/product/product.types";

export const getCartService = async (userId: UserId): Promise<CartResponse> => {
  try {
    const cart = await getCart(userId);
    const { id, items, total } = cart;
    return {
      cart: {
        id,
        items
      },
      total
    }
  } catch (_) {
    throw new Error('Server error. Please try again.')
  }
};

export const updateCartService = async (
  userId: UserId,
  updateCartData: UpdateCartRequestBody
): Promise<CartResponse> => {
  let products: Product[] = []
  
  const data = Array.isArray(updateCartData) ? updateCartData : [updateCartData];
  const dataWithValidCount = data.filter((item) => item.count > 0);

  if (dataWithValidCount.length > 0) {
    for (const item of data) {
      const product = await getProductByIdService(item.productId);
      if (!product) {
        throw new BadRequestError("Products are not valid");
      }
      products.push(product);
    }
  }
  const mappedProducts = products.map((product, index) => {
    return {
      product,
      count: dataWithValidCount[index].count,
    };
  });

  const total = mappedProducts.reduce((acc, item) => acc + (item.count * item.product.price), 0);
  const cart = await updateCart(userId, mappedProducts, total);
  if (!cart) {
    throw new NotFoundError(`Cart was not found`);
  }
  return {
    cart: {
      id: cart.id,
      items: cart.items,
    },
    total,
  };
};

export const deleteCartService = async (userId: UserId): Promise<Boolean> => {
  const cartMarkedAsDeleted = await deleteCart(userId);
  if (!cartMarkedAsDeleted) {
    throw new BadRequestError(`No cart with for such user id`);
  }
  return cartMarkedAsDeleted
};
