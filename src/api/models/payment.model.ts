import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../db";
import type { UUID } from "node:crypto";
import CheckoutModel from "./checkout.model";

interface PaymentModelInterface extends Model<InferAttributes<PaymentModelInterface>, InferCreationAttributes<PaymentModelInterface>> {
  id: CreationOptional<number>;
  checkoutId: UUID,
  type: string,
  address?: string
  creditCard?: string
}

const PaymentModel = sequelize.define<PaymentModelInterface>('Payment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  checkoutId: { type: DataTypes.UUID, allowNull: false, references: { model: CheckoutModel, key: 'id' }},
  type: { type: DataTypes.STRING, allowNull: false},
  address: { type: DataTypes.STRING, allowNull: true, defaultValue: null},
  creditCard: { type: DataTypes.STRING, allowNull: true, defaultValue: null},
}, {
  tableName: 'checkout_payment'
});

export default PaymentModel;

