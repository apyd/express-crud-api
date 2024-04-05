const Joi = require('joi');

const productSchema = Joi.object({
    productId: Joi.string().guid({ version: 'uuidv4' }),
    count: Joi.number().integer().min(1),
})

const schema = Joi.alternatives().try(
    Joi.array().items(productSchema),
    productSchema,
    Joi.array().items(Joi.any())
)

export default schema