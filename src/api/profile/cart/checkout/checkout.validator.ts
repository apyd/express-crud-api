const Joi = require("joi");

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
  total: Joi.number().integer().min(0).required(),
});

export default schema;
