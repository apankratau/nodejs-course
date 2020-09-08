import express from 'express';
import UserService from '../services/UserService';
import validators from '../middlewares/validators';
import schema from '../schema';
import { DEFAULT_LIMIT } from '../consts';

const router = express.Router();

router.get('/', async (req, res) => {
  res.send(await UserService.getAll());
});

router.get('/autosuggest', validators(schema.usersAutoSuggest, 'query'), async (req, res) => {
  const { login = '', limit = DEFAULT_LIMIT } = req.query;
  res.send(await UserService.getAutosuggested(String(login), Number(limit)));
});

router.get('/:id', validators(schema.userId, 'params'), async (req, res) => {
  const user = await UserService.getById(Number(req.params.id));
  user ? res.send(user) : res.status(404).send({ message: 'User not found!' });
});

router.post('/', validators(schema.user, 'body'), async (req, res) => {
  res.send(await UserService.create(req.body));
});

router.put('/:id', validators(schema.userId, 'params'), validators(schema.user, 'body'), async (req, res) => {
  const user = await UserService.update(Number(req.params.id), req.body);
  user ? res.send(user) : res.status(404).send({ message: 'User not found!' });
});

router.delete('/:id', validators(schema.userId, 'params'), async (req, res) => {
  const user = await UserService.delete(Number(req.params.id));

  user ? res.send({ messge: 'User has been deleted' }) : res.status(404).send({ message: 'User not found!' });
});

export default router;
