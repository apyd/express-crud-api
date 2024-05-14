import type { UUID } from "node:crypto";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../db";
import { UserRole } from "../types/user.types";

interface UserModelInterface
  extends Model<
    InferAttributes<UserModelInterface>,
    InferCreationAttributes<UserModelInterface>
  > {
  id: CreationOptional<UUID>;
  email: string;
  password: string;
  role: UserRole;
}

export const UserModel = sequelize.define<UserModelInterface>(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isIn: [["user", "admin"]] },
    },
  },
  {
    tableName: "users",
  }
);

export default UserModel;
