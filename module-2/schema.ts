import Joi from 'joi';

const MIN_LENGTH = 3;
const MAX_LENGTH = 20;
const MIN_AGE = 4;
const MAX_AGE = 130;

const schema = Joi.object({
  login: Joi.string().alphanum().min(MIN_LENGTH).max(MAX_LENGTH).required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'))
    .required(),
  age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).required(),
});

export default schema;
