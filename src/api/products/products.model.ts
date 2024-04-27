import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../../server";
import type { Product } from "./product/product.types";
import { UUID } from "node:crypto";

interface ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> {
  id: CreationOptional<UUID>;
  title: Product['title'],
  description: Product['description'],
  price: Product['price']
}

const ProductModel = sequelize.define<ProductModel>('Product', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL, allowNull: false, validate: { min: 0 }},
}, {
  tableName: 'products'
});

export default ProductModel;
