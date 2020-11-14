import express from 'express';
import UserService from '../services/UserService';
import validators from '../middlewares/validators';
import checkJwt from '../middlewares/check-jwt';
import { UserSchema } from '../schema';
import { DEFAULT_LIMIT } from '../core/constants';
import asyncCatch from '../core/utils/asyncCatch';

const router = express.Router();

router.use(checkJwt);

router.get(
  '/',
  asyncCatch(async (req, res) => {
    res.send(await UserService.getAll());
  }),
);

router.get(
  '/autosuggest',
  validators(UserSchema.usersAutoSuggest, 'query'),
  asyncCatch(async (req, res) => {
    const { login = '', limit = DEFAULT_LIMIT } = req.query;
    res.send(await UserService.getAutosuggested(String(login), Number(limit)));
  }),
);

router.get(
  '/:id',
  validators(UserSchema.userId, 'params'),
  asyncCatch(async (req, res) => {
    const user = await UserService.getById(req.params.id);
    user ? res.send(user) : res.status(404).send({ message: 'User not found!' });
  }),
);

router.post(
  '/',
  validators(UserSchema.user, 'body'),
  asyncCatch(async (req, res) => {
    res.send(await UserService.create(req.body));
  }),
);

router.put(
  '/:id',
  validators(UserSchema.userId, 'params'),
  validators(UserSchema.user, 'body'),
  asyncCatch(async (req, res) => {
    const user = await UserService.update(req.params.id, req.body);
    user ? res.send(user) : res.status(404).send({ message: 'User not found!' });
  }),
);

router.delete(
  '/:id',
  validators(UserSchema.userId, 'params'),
  asyncCatch(async (req, res) => {
    const user = await UserService.delete(req.params.id);

    user ? res.send({ message: 'User has been deleted' }) : res.status(404).send({ message: 'User not found!' });
  }),
);

export default router;
