import { Request, Response, NextFunction } from 'express';
import logger from '../core/logger';

export default function (err: Error, req: Request, res: Response, _: NextFunction): void {
  const message = err.message || 'Internal Server Error';

  logger.error(message);
  logger.error(err.stack);
  res.status(500).send({ error: message });
}
