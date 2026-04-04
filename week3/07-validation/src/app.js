import express from 'express';
import api from './api/index.js';
import cors from 'cors';
import { notFoundHandler, errorHandler } from './middlewares/error-handlers.js';

const app = express();
app.use(cors());
// Parses incoming requests with JSON payloads
app.use(express.json());
// Parses URL-encoded form data (like HTML forms)
app.use(express.urlencoded({ extended: true }));

// root route
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// connect API
app.use('/api/v1', api);

// static files
app.use('/public', express.static('public'));

// error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
