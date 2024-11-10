import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import { responseMiddleware } from './middleware/response.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import { requestLogger } from './middleware/logger.middleware';
import { logger } from './config/logger.config';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(requestLogger);

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://family-tree.cuocthien.io.vn' : 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json({ limit: '50mb' }));
app.use(responseMiddleware());
app.use('/api/users', userRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Application error', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  next(err);
});

app.use(errorMiddleware);

export default app;
