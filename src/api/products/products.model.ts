import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../server";
import type { Product } from "./product/product.types";

const ProductModel = sequelize.define<Model<Product, Omit<Product, "id">>>('Product', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL, allowNull: false, validate: { min: 0 }},
}, {
  tableName: 'products'
});

export default ProductModel;
