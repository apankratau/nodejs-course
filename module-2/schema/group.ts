import Joi from 'joi';

const schema = {
  group: Joi.object({
    name: Joi.string().alphanum().required(),
    permissions: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')).required(),
  }),
  groupId: Joi.object({
    id: Joi.string().uuid(),
  }),
  userIds: Joi.object({
    userIds: Joi.array().items(Joi.string().uuid()),
  }),
};

export default schema;
