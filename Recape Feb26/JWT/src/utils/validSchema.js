import Joi from 'joi';

const requiredString = Joi.string().trim().required();

const addressSchema = Joi.object({
    city: requiredString,
    state: requiredString,
    pincode: Joi.number().integer().required().min(100000).max(999999)
})

const userVaidatioSchema = Joi.object({
    name: requiredString,
    age: Joi.number().default(18).min(18).max(60),
    email : requiredString.email(),
    password : Joi.string().required().min(8).max(32),
    address : addressSchema,
    phone : Joi.string().trim().pattern(/^[0-9]{10}$/).required()
})

const taskValidationSchema = Joi.object({
    description: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            'string.empty': 'Description cannot be empty',
            'any.required': 'Description is a required field'
        }),

    completed: Joi.boolean()
        .default(false),

    ownerId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            'string.pattern.base': 'ownerId must be a valid MongoDB ObjectId'
        })
});

export {userVaidatioSchema, taskValidationSchema}