import type { UUID } from "node:crypto";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { sequelize } from "../../db";

import CartItems from "./cartItem/cartItem.model";
import ProductModel from "../../products/products.model";

import type { Cart, CartItem } from "./cart.types";

interface CartModelInterface extends Model<InferAttributes<CartModelInterface>, InferCreationAttributes<CartModelInterface>> {
  id: CreationOptional<UUID>;
  userId: Cart['userId'],
  isDeleted: CreationOptional<Cart['isDeleted']>
  total: CreationOptional<Cart['total']>
  items: NonAttribute<CartItem[]>
}

const CartModel = sequelize.define<CartModelInterface>('Cart', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
  // temporarily userId is not referenced to user table as it doesn't exist- 
  // this will be implemented in next PR at the moment we just keep userId as a uuidv4
  userId: { type: DataTypes.UUID, allowNull: false, validate: { isUUID: 4 }},
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  total: { type: DataTypes.DECIMAL, defaultValue: 0, validate: { min: 0 }},
}, {
  tableName: 'carts'
});

CartModel.hasMany(CartItems, { foreignKey: 'cartId', as: 'items' });
CartItems.belongsTo(ProductModel, { foreignKey: 'productId', as: 'product' });

export default CartModel;

