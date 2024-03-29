import Joi from "joi";

const schema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }),
});

export default schema;
