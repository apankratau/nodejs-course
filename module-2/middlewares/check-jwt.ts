import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';

export default async function (req: Request, res: Response, next: NextFunction): Promise<void> {
  const auth = req.headers.authorization;

  if (!auth) {
    res.status(401).send({ message: 'Not authorized' });
  }

  const accessToken = String(
    auth
      ?.split(' ')
      .map(v => v.trim())
      .filter(v => !/(bearer)/i.exec(v))[0],
  );

  try {
    await AuthService.isAccessTokenValid(accessToken)
      ? next()
      : res.status(403).send({ message: 'Provided token is expired' });
  } catch (e) {
    next(e);
  }
}
