import express from 'express';
import users from '../routers/users';
import groups from '../routers/groups';

const db = {};

const app = express();
app.use(express.json());

app.use('/users', users);
app.use('/groups', groups);

export { app, db };
