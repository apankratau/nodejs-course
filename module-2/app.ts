import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import db from './DAL';
import auth from './routers/auth';
import users from './routers/users';
import groups from './routers/groups';
import logging from './middlewares/logging';
import error from './middlewares/error';

const app = express();
app.use(express.json());
app.use(helmet());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(logging);

app.use('/auth', auth);
app.use('/users', users);
app.use('/groups', groups);

app.all('*', (req, res, _) => {
  res.status(404).send({ error: 'Not found' });
});

app.use(error);

export { app, db };
