import express from 'express';
import cors from 'cors';
import { Database } from '@database/index';
import * as dotenv from 'dotenv';

const app: express.Application = express();

dotenv.config();

app.use(cors());
app.options('*', cors);
app.use(express.json());
new Database().connect(process.env.DB_CONNECTION_STRING || '');

export { app }