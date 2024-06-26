const Joi = require("joi");
import { BadRequestError } from "../utils/errors";

import type { RequestOrderData } from "../types/checkout.types";

const schema = Joi.object({
  payment: {
    type: Joi.string().required(),
    address: Joi.any(),
    creditCard: Joi.any(),
  },
  delivery: {
    type: Joi.string().required(),
    address: Joi.any().required(),
  },
  comments: Joi.string().required(),
  status: Joi.string().valid("created", "completed").required(),
});

export const validateCheckout = (checkoutData: RequestOrderData) => {
  const { error } = schema.validate(checkoutData);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }
  return;
};

