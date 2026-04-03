import express from 'express';
import api from './api/index.js';

const app = express();
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

export default app;
