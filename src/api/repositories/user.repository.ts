import { sequelize } from "../db";

import UserModel from "../models/user.model";
import { CreateUserRequestBody } from "../types/user.types";

export const getUserByEmail = async (email: string) => {
    return await UserModel.findOne({ where: { email } })
}
 
export const registerUser = async (userData: CreateUserRequestBody) => {
    return await UserModel.create(userData)
}

