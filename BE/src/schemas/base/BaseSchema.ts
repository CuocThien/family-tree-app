import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export interface IValidationSchema {
  type: string;
  properties: Record<string, any>;
  required?: string[];
  additionalProperties?: boolean;
}

export abstract class BaseSchema {
  protected schema: IValidationSchema;

  constructor() {
    this.schema = {
      type: 'object',
      properties: {},
      required: [],
      additionalProperties: false
    };
  }

  getSchema(): IValidationSchema {
    return this.schema;
  }

  validate(data: any): boolean {
    const validator = ajv.compile(this.schema);
    return validator(data);
  }

  getErrors(): any[] {
    const validator = ajv.compile(this.schema);
    return validator.errors || [];
  }
}