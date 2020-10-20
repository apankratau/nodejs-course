import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';

export default function (req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers.authorization;

  if (!auth) {
    res.status(401).send({ message: 'Not authorized' });
  } else {
    const accessToken = auth
      ?.split(' ')
      .map(v => v.trim())
      .filter(v => !/(bearer)/i.exec(v))[0];

    if (AuthService.isAccessTokenValid(accessToken)) {
      next();
    } else {
      res.status(403).send({ message: 'Provided token is expired' });
    }
  }
}
