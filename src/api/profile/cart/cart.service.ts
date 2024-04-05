import { getProductByIdService } from "../../products/products.service";
import { getCart, updateCart, deleteCart } from "./cart.repository";
import { BadRequestError, NotFoundError } from "../../utils/errors";

import type { Cart, CartResponse, UpdateCartRequestBody } from "./cart.types";
import type { UserId } from "../profile.type";
import type { Product } from "../../products/product/product.types";

export const getCartService = async (userId: UserId): Promise<Cart> => {
  return await getCart(userId);
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

  const updatedCart = await updateCart(userId, data, products);
  if (!updatedCart) {
    throw new NotFoundError(`Cart was not found`);
  }
  const total = updatedCart.items.reduce((acc, item) => acc + (item.count * item.product.price), 0);
  return {
    cart: updatedCart,
    total,
  };
};

export const deleteCartService = async (userId: UserId): Promise<Cart> => {
  const deletedCart = await deleteCart(userId);
  if (!deletedCart) {
    throw new BadRequestError(`No cart with for such user id`);
  }
  return deletedCart;
};
