import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { sequelize } from "../db";
import CartModel from './cart.model'
import CartItemModel from "./cartItem.model";

import type { UUID } from "node:crypto";
import type { CartItem, Cart } from "../types/cart.types";
import { Delivery, ORDER_STATUS, Payment } from "../types/checkout.types";
import PaymentModel from "./payment.model";
import DeliveryModel from "./delivery.model";

  interface CheckoutModelInterface extends Model<InferAttributes<CheckoutModelInterface>, InferCreationAttributes<CheckoutModelInterface>> {
    id: CreationOptional<UUID>;
    userId: UUID,
    cartId: UUID,
    items: NonAttribute<CartItem[]>,
    payment: NonAttribute<Payment>,
    delivery: NonAttribute<Delivery>
    comments: string,
    status: ORDER_STATUS,
    total: NonAttribute<Cart['total']>
  }

  const CheckoutModel = sequelize.define<CheckoutModelInterface>('Checkout', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    userId: { type: DataTypes.UUID, allowNull: false, validate: { isUUID: 4 }},
    cartId: { type: DataTypes.UUID, allowNull: false, references: { model: CartModel, key: 'id' }},
    comments: { type: DataTypes.STRING, allowNull: false},
    status: { type: DataTypes.STRING, validate: { isIn: [['created', 'completed']] }},
  }, {
    tableName: 'checkouts'
  });

CheckoutModel.hasOne(PaymentModel, { foreignKey: 'checkoutId',  as: 'payment' });
CheckoutModel.hasOne(DeliveryModel, { foreignKey: 'checkoutId', as: 'delivery' });
CheckoutModel.hasOne(CartModel, { as: 'total' });
CheckoutModel.hasOne(CartItemModel, { foreignKey: 'cartId', as: 'items' });
PaymentModel.belongsTo(CheckoutModel, { foreignKey: 'checkoutId'});
DeliveryModel.belongsTo(CheckoutModel, { foreignKey: 'checkoutId'});

export default CheckoutModel
