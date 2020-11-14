import Joi from 'joi';

const schema = {
  login: Joi.object({
    username: Joi.required(),
    password: Joi.required(),
  }),
  token: Joi.object({
    token: Joi.required(),
  }),
};

export default schema;
