import express from 'express';
import cors from 'cors';
import { Database } from '@database/index';
import * as dotenv from 'dotenv';
import { authRouter } from 'routes/auth.routes';
import { mainRouter } from 'routes/main.routes';
import { userRouter } from 'routes/user.routes';
import { roomRouter } from 'routes/room.routes';

const app: express.Application = express();

dotenv.config();
// app.options('*', cors);
const allowedOrigins = ['http://loocalhost:4200']
app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/room', roomRouter);

new Database().connect(process.env.DB_CONNECTION_STRING || '');

export { app }