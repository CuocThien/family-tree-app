import dotenv from 'dotenv';
import app from './app';
import connectDB from './utils/database';
import { logger } from './config/logger.config';

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  logger.error('Failed to connect to database', { error: error.message });
  process.exit(1);
});
