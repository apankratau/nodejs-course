import Joi from 'joi';
import { MIN_LENGTH, MAX_LENGTH, MIN_AGE, MAX_AGE, MIN_LIMIT } from './consts';

const schema = {
  user: Joi.object({
    login: Joi.string().alphanum().min(MIN_LENGTH).max(MAX_LENGTH).required(),
    password: Joi.string().pattern(new RegExp('^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')).required(),
    age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).required(),
  }),
  userId: Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }),
  }),
  usersAutoSuggest: Joi.object({
    login: Joi.required(),
    limit: Joi.number().integer().min(MIN_LIMIT),
  }),
};

export default schema;
