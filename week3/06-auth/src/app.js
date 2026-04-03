import express from 'express';
import cors from 'cors';
import api from './api/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', api);

export default app;
