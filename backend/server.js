// note: add "type": "module" to package.json in root folder
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
// for backend imports, .js extension is required for local files
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const PORT = process.env.PORT || 5500;
const ENVIRONMENT = process.env.NODE_ENV;

connectDB();
const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('API is up and running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

// make uploads folder static - note: use resolve method to create __dirname, as it is not available with ES modules as it would be when using common JS syntax
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(`Game On! : Running in ${ENVIRONMENT} mode on port ${PORT}`)
);
