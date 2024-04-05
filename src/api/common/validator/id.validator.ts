import Joi from "joi";
import { UUID } from "node:crypto";
import { BadRequestError } from "../../utils/errors";

const schema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }),
});

export const validateId = (id: UUID) => {
  const { error } = schema.validate(id);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }
  return;
};
