import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.config';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logInfo = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('user-agent'),
      ip: req.ip
    };

    if (res.statusCode >= 400) {
      logger.error('Request failed', logInfo);
    } else {
      logger.info('Request completed', logInfo);
    }
  });

  next();
}; 