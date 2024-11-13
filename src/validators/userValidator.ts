import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const addProductSchema = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        qty: Joi.number().required(),
        rate: Joi.number().required(),
      })
    )
    .required(),
});
