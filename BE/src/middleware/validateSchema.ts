import { Request, Response, NextFunction, RequestHandler } from 'express';
import { BaseSchema } from '../schemas/base/BaseSchema';

export const validateSchema = (SchemaClass: new () => BaseSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): any => {
    try {
      const validator = new SchemaClass();
      const isValid = validator.validate(req.body);

      if (!isValid) {
        return res.status(422).json({
          success: false,
          message: 'Validation failed',
          errors: validator.getErrors().map(error => ({
            field: error.instancePath.replace('/', '') || error.params.missingProperty,
            message: error.message,
            value: error.data
          }))
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal validation error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
};