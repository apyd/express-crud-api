import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../../db";
import Cart from "../cart.model";
import Product from "../../../products/products.model";
import type { UUID } from "node:crypto";

interface CartItemModelInterface extends Model<InferAttributes<CartItemModelInterface>, InferCreationAttributes<CartItemModelInterface>> {
  id: CreationOptional<number>;
  cartId: UUID,
  productId: UUID,
  count: number,
}

const CartItemModel = sequelize.define<CartItemModelInterface>('CartItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  cartId: { type: DataTypes.UUID, allowNull: false, references: { model: Cart, key: 'id' }},
  productId: { type: DataTypes.UUID, allowNull: false, references: { model: Product, key: 'id'}},
  count: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 }},
}, {
  tableName: 'cart_items'
});

CartItemModel.hasMany(Product, { foreignKey: 'productId' });

export default CartItemModel;

