import type { UUID } from 'crypto';
import type { CartId, CartItem } from '../cart.types';
import type { UserId } from '../../profile.type';

type ORDER_STATUS = 'created' | 'completed';

type OrderId = UUID;

export interface Order {
  id: OrderId,
  userId: UserId;
  cartId: CartId;
  items: CartItem[]
  payment: {
    type: string,
    address?: any,
    creditCard?: any,
  },
  delivery: {
    type: string,
    address: any,
  },
  comments: string,
  status: ORDER_STATUS;
  total: number;
}

export type RequestOrderData = Pick<Order, 'payment' | 'delivery' | 'comments' | 'status'>