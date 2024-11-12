import { Request, Response, NextFunction, RequestHandler } from 'express';
import { BaseSchema } from '../schemas/base/BaseSchema';

type ValidationType = 'body' | 'query' | 'params';

export const validateSchema = (SchemaClass: new () => BaseSchema, type: ValidationType = 'body'): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): any => {
    try {
      const validator = new SchemaClass();
      let dataToValidate;

      switch (type) {
        case 'body':
          dataToValidate = req.body;
          break;
        case 'query':
          dataToValidate = req.query;
          break;
        case 'params':
          dataToValidate = req.params;
          break;
        default:
          dataToValidate = req.body;
      }

      const isValid = validator.validate(dataToValidate);

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