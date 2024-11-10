import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import { responseMiddleware } from './middleware/response.middleware';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(responseMiddleware());
app.use('/api/users', userRoutes);

app.use(errorMiddleware);

export default app;
