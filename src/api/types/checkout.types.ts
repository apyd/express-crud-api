import type { UUID } from 'crypto';
import type { CartId, CartItem } from './cart.types';
import type { UserId } from './user.types';

export type ORDER_STATUS = 'created' | 'completed';

type OrderId = UUID;

export type Delivery = {
  type: string,
  address: string
}

export type Payment = {
  type: string,
  address?: string,
  creditCard?: string,
}

export interface Order {
  id: OrderId,
  userId: UserId;
  cartId: CartId;
  items: CartItem[]
  payment: Payment,
  delivery: Delivery,
  comments: string,
  status: ORDER_STATUS;
  total: number;
}

export type RequestOrderData = Pick<Order, 'payment' | 'delivery' | 'comments' | 'status'>