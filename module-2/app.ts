import express from 'express';
import users from './routes/users';

const app = express();
app.use(express.json());
app.use('/users', users);

export { app };
