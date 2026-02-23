import Joi from 'joi';

const requiredString = Joi.string().trim().required();

const addressSchema = Joi.object({
    city: requiredString,
    state: requiredString,
    pincode: Joi.number().integer().required().min(100000).max(999999)
})

const userValidatioSchema = Joi.object({
    name: requiredString,
    age: Joi.number().default(18).min(18).max(60),
    email : requiredString.email(),
    password : Joi.string().required().min(8).max(32),
    address: Joi.array().items(addressSchema).min(1).required(),
    phoneNumber : Joi.string().trim().pattern(/^[0-9]{10}$/).required()
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
        .default(false)
});

const passwordValidationSchema = Joi.object({
    email: Joi.string().trim().required().email(),
    password: Joi.string().required().min(8).max(32)
})

export {userValidatioSchema, taskValidationSchema,passwordValidationSchema}