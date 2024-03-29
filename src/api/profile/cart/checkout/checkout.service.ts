import { createOrder } from './checkout.repository';
import { BadRequestError } from '../../../../utils/errors';
import type { Order, RequestOrderData } from './checkout.types';
import type { UserId } from '../../profile.type';

export const createOrderService = async (userId: UserId, orderData: RequestOrderData): Promise<Order | null> => {
    const order = await createOrder(userId, orderData);
    if(!order) {
        throw new BadRequestError(`Cart is empty`);
    }
    return order;
}