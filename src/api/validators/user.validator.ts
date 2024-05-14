const Joi = require('joi');
import { BadRequestError } from "../utils/errors";

import type { CreateUserRequestBody, LoginUserRequestBody } from "../types/user.types";

type UserSchemaType = 'register' | 'login'

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("user", "admin").required()
})

export const validateUser = (userData: CreateUserRequestBody | LoginUserRequestBody, type: UserSchemaType = 'register') => {
    if(type !== 'register' && type !== 'login') return

    const schema = type === 'register' ? registerSchema : loginSchema
    const { error } = schema.validate(userData);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }
    return;
};