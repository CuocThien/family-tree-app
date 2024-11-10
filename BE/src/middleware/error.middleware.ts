import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../interfaces/response.interface';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const errors = err.errors || [message];

  const errorResponse: ApiResponse = {
    status: statusCode,
    message: message,
    errors: Array.isArray(errors) ? errors : [errors],
    data: null
  };

  res.status(statusCode).json(errorResponse);
}; 