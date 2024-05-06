import { timestampsFieldsList } from "../constants";

import UserModel from "../models/user.model";
import { CreateUserRequestBody } from "../types/user.types";

export const getUserByEmail = async (email: string) => {
    return await UserModel.findOne({ where: { email }, attributes: { exclude: timestampsFieldsList } },)
}
 
export const registerUser = async (userData: CreateUserRequestBody) => {
    return await UserModel.create({...userData})
}

