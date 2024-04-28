import type { UUID } from 'crypto';
import type { CartId, CartItem } from '../cart.types';
import type { UserId } from '../../profile.type';

export type ORDER_STATUS = 'created' | 'completed';

type OrderId = UUID;

export interface Order {
  id: OrderId,
  userId: UserId;
  cartId: CartId;
  items: CartItem[]
  payment: {
    type: string,
    address?: string,
    creditCard?: string,
  },
  delivery: {
    type: string,
    address: string,
  },
  comments: string,
  status: ORDER_STATUS;
  total: number;
}

export type RequestOrderData = Pick<Order, 'payment' | 'delivery' | 'comments' | 'status'>