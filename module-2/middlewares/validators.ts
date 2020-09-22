import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { RequestProperty } from '../core/types/express';

const validators = (schema: Joi.Schema, property: RequestProperty) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const result: Joi.ValidationResult = schema.validate(req[property]);

  if (!result.error) {
    next();
  } else {
    res.status(400).send({ error: result.error.details.map(detail => detail.message) });
  }
};

export default validators;
