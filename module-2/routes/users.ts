import express from 'express';
import { v4 as uuid } from 'uuid';
import User from '../models/User';
import { Users } from '../db';
import schema from '../schema';
import { filterNotDeleted, getAutoSuggestUsers } from '../utils';

const router = express.Router();

router.get('/', (req, res) => {
  res.send([...Users.values()].filter(filterNotDeleted));
});

router.get('/all', (req, res) => {
  res.send([...Users.values()]);
});

const DEFAULT_LIMIT = 3;
router.get('/autosuggest', (req, res) => {
  const { login = '', limit = DEFAULT_LIMIT } = req.query;
  res.send(getAutoSuggestUsers(Users)(String(login), Number(limit)));
});

router.get('/:id', (req, res) => {
  const user = Users.get(req.params.id);
  !user?.isDeleted
    ? res.send(user)
    : res.status(404).send({ message: 'User not found!' });
});

router.post('/', (req, res) => {
  const { login, password, age } = <User>req.body;
  const { error } = schema.validate({ login, password, age });
  if (error) {
    res.status(400).send({ error: error.details.map(detail => detail.message) });
  } else {
    const userId = uuid();
    const user: User = {
      id: userId,
      login,
      password,
      age,
      isDeleted: false,
    };
    Users.set(userId, user);

    res.send(user);
  }
});

router.put('/:id', (req, res) => {
  const user = Users.get(req.params.id) as User;
  if (!user?.isDeleted) {
    const { id, isDeleted } = user;
    const { login, password, age } = <User>req.body;
    const updatedUser: User = {
      id,
      login: login ?? user.login,
      password: password ?? user.password,
      age: age ?? user.age,
      isDeleted,
    };
    Users.set(id, updatedUser);
    res.send(updatedUser);
  } else {
    res.status(404).send({ message: 'User not found!' });
  }
});

router.delete('/:id', (req, res) => {
  const user = Users.get(req.params.id);
  if (!user?.isDeleted) {
    // @ts-expect-error
    Users.set(user.id, {
      ...user,
      isDeleted: true,
    });
    res.send({ messge: 'User has been deleted' });
  } else {
    res.status(404).send({ message: 'User not found!' });
  }
});

export default router;
