import express from 'express';
import { v4 as uuid } from 'uuid';
import User from '../models/User';
import { Users } from '../db';
import validators from '../middlewares/validators';
import schema from '../schema';
import { isAvailable, isMissing, getAutoSuggestUsers } from '../utils';
import { DEFAULT_LIMIT } from '../consts';

const router = express.Router();

router.get('/', (req, res) => {
  res.send([...Users.values()].filter(isAvailable));
});

router.get('/all', (req, res) => {
  res.send([...Users.values()]);
});

router.get('/autosuggest', validators(schema.usersAutoSuggest, 'query'), (req, res) => {
  const { login = '', limit = DEFAULT_LIMIT } = req.query;
  res.send(getAutoSuggestUsers(Users)(String(login), Number(limit)));
});

router.get('/:id', validators(schema.userId, 'params'), (req, res) => {
  const user = Users.get(req.params.id);
  isMissing(user) ? res.status(404).send({ message: 'User not found!' }) : res.send(user);
});

router.post('/', validators(schema.user, 'body'), (req, res) => {
  const { login, password, age } = <User>req.body;

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
});

router.put('/:id', validators(schema.userId, 'params'), validators(schema.user, 'body'), (req, res) => {
  const user = Users.get(req.params.id) as User;

  if (isMissing(user)) {
    res.status(404).send({ message: 'User not found!' });
    return;
  }

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
});

router.delete('/:id', validators(schema.userId, 'params'), (req, res) => {
  const user = Users.get(req.params.id) as User;
  if (isMissing(user)) {
    res.status(404).send({ message: 'User not found!' });
    return;
  }

  Users.set(user.id, {
    ...user,
    isDeleted: true,
  });
  res.send({ messge: 'User has been deleted' });
});

export default router;
