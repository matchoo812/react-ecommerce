// note: add "type": "module" to root package.json
import express from 'express';
import dotenv from 'dotenv';
// for backend imports, .js extension is required for local files
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const PORT = process.env.PORT || 5500;
const ENVIRONMENT = process.env.NODE_ENV;

connectDB();
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is up and running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(`Game On! : Running in ${ENVIRONMENT} mode on port ${PORT}`)
);
