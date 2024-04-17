import type { Product, ProductId } from "../../products/product/product.types";
import type { UUID } from "node:crypto"
import type { UserId } from "../profile.type";

export type CartId = UUID;

export type CartItem = {
  product: Product;
  count: number;
}

export type Cart = {
  id: CartId,
  userId: UserId;
  isDeleted: boolean;
  items: CartItem[];
  total: number;
}

export type UpdateCartItem = {
  productId: ProductId;
  count: number;
}

export type CartResponse = {
  cart: Pick<Cart, "id" | "items">;
  total: number;
}

export type UpdateCartRequestBody = UpdateCartItem | UpdateCartItem[] | [];