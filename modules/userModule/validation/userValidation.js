import Joi from 'joi';

// Schema for creating a user
export const createUserSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
});

// Schema for updating a user
export const updateUserSchema = Joi.object({
    username: Joi.string().min(3).max(30),
    password: Joi.string().min(6),
});
