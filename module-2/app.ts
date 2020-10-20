import express from 'express';
import db from './DAL';
import users from './routers/users';
import groups from './routers/groups';
import logging from './middlewares/logging';
import error from './middlewares/error';

const app = express();
app.use(logging);
app.use(express.json());

app.use('/users', users);
app.use('/groups', groups);

app.all('*', (req, res, _) => {
  res.status(404).send({ error: 'Not found' });
});

app.use(error);

export { app, db };
