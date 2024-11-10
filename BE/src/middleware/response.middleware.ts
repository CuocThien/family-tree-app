import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../interfaces/response.interface';

export const responseMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;
    const originalSend = res.send;

    res.json = function (data: any): Response {
      const formattedResponse: ApiResponse = {
        status: res.statusCode,
        message: 'Success',
        errors: null,
        data: data
      };
      return originalJson.call(this, formattedResponse);
    };

    res.send = function (data: any): Response {
      if (typeof data === 'object') {
        const formattedResponse: ApiResponse = {
          status: res.statusCode,
          message: 'Success',
          errors: null,
          data: data
        };
        return originalJson.call(this, formattedResponse);
      }
      return originalSend.call(this, data);
    };

    next();
  };
}; 