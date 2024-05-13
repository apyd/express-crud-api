const Joi = require('joi');
import { BadRequestError } from "../utils/errors";

import type { UpdateCartRequestBody } from "../types/cart.types";

const productSchema = Joi.object({
    productId: Joi.string().guid({ version: 'uuidv4' }),
    count: Joi.number().integer().min(1),
})

const schema = Joi.alternatives().try(
    Joi.array().items(productSchema),
    productSchema,
    Joi.array().items(Joi.any())
)

export const validateCart = (cartData: UpdateCartRequestBody) => {
  const { error } = schema.validate(cartData);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }
  return;
};