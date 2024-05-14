import Joi from "joi";
import { UUID } from "node:crypto";
import { BadRequestError } from "../utils/errors";

export const validateId = (id: UUID) => {
  const { error } = Joi.object({
    id: Joi.string().guid({ version: "uuidv4" }),
  }).validate({id});
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }
  return;
};
