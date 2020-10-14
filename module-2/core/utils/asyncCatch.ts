import { Request, Response, NextFunction } from 'express';

export default function (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return function (req: Request, res: Response, next: NextFunction): Promise<any> {
    return fn(req, res, next).catch(next);
  };
}
