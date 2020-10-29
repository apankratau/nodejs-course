import express from 'express';
import { compareSync } from 'bcrypt';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';
import validators from '../middlewares/validators';
import { AuthSchema } from '../schema';
import asyncCatch from '../core/utils/asyncCatch';
import { LoginAttributes } from '../core/types/auth';

const router = express.Router();

router.post(
  '/login',
  validators(AuthSchema.login, 'body'),
  asyncCatch(async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { username, password }: LoginAttributes = req.body;
    const users = await UserService.getAll();

    const user = users.find(u => username === u.get('login') && compareSync(password, u.get('password')));

    user ? res.send(await AuthService.createTokenPair(user)) : res.status(404).send({ message: 'User not found!' });
  }),
);

router.post(
  '/token',
  validators(AuthSchema.token, 'body'),
  asyncCatch(async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { token } = req.body;
    const accessToken = await AuthService.createAccessToken(token);

    accessToken ? res.send(accessToken) : res.status(403).send({ message: 'Provided token is expired' });
  }),
);

router.post(
  '/logout',
  validators(AuthSchema.token, 'body'),
  asyncCatch(async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { token } = req.body;

    await AuthService.logout(token);

    res.send({ message: 'Logout successful' });
  }),
);

export default router;
