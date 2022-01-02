// note: add "type": "module" to root package.json
import express from 'express';
import dotenv from 'dotenv';
// for backend imports, .js extension is required for local files
import products from './data/products.js';

dotenv.config();
const PORT = process.env.PORT || 5500;
const ENVIRONMENT = process.env.NODE_ENV;

const app = express();

app.get('/', (req, res) => {
  res.send('API is up and running...');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(
  PORT,
  console.log(`Game On! : Running in ${ENVIRONMENT} mode on port ${PORT}`)
);
