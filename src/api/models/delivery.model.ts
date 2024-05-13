import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../db";
import type { UUID } from "node:crypto";
import CheckoutModel from "./checkout.model";

interface DeliveryModelInterface extends Model<InferAttributes<DeliveryModelInterface>, InferCreationAttributes<DeliveryModelInterface>> {
  id: CreationOptional<number>;
  checkoutId: UUID,
  type: string,
  address: string
}

const DeliveryModel = sequelize.define<DeliveryModelInterface>('Delivery', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  checkoutId: { type: DataTypes.UUID, allowNull: false, references: { model: CheckoutModel, key: 'id' }},
  type: { type: DataTypes.STRING, allowNull: false},
  address: { type: DataTypes.STRING, allowNull: false},
}, {
  tableName: 'checkout_delivery'
});

export default DeliveryModel;

