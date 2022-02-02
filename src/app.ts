import express from 'express';
import cors from 'cors';
import { Database } from '@database/index';
import * as dotenv from 'dotenv';
import { authRouter } from 'routes/auth.routes';

const app: express.Application = express();

dotenv.config();

app.use(cors());
app.options('*', cors);
app.use(express.json());
app.use('/auth', authRouter);
new Database().connect(process.env.DB_CONNECTION_STRING || '');

export { app }