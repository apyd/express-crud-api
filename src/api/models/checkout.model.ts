import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { sequelize } from "../db";
import CartModel from './cart.model'

import type { UUID } from "node:crypto";
import type { CartItem, Cart } from "../types/cart.types";
import { ORDER_STATUS } from "../types/checkout.types";

interface CheckoutModelInterface extends Model<InferAttributes<CheckoutModelInterface>, InferCreationAttributes<CheckoutModelInterface>> {
  id: CreationOptional<UUID>;
  userId: UUID,
  cartId: UUID,
  items: NonAttribute<CartItem[]>
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
  status: ORDER_STATUS,
  total: NonAttribute<Cart['total']>
}

const CheckoutModel = sequelize.define<CheckoutModelInterface>('Checkout', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
  userId: { type: DataTypes.UUID, allowNull: false, validate: { isUUID: 4 }},
  cartId: { type: DataTypes.UUID, allowNull: false, references: { model: CartModel, key: 'id' }},
  payment: { type: DataTypes.JSON }, // TODO
  delivery: { type: DataTypes.JSON }, // TODO
  comments: { type: DataTypes.STRING, allowNull: false},
  status: { type: DataTypes.STRING, validate: { isIn: [['created', 'completed']] }},
}, {
  tableName: 'checkouts'
});

export default CheckoutModel
