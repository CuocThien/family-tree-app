import { BaseSchema } from '../base/BaseSchema';
import {
  StringOptionalProperty,
  NumberPositiveOrZeroProperty
} from '../common/CommonSchemaProperties';

export class GetAllUsersSchema extends BaseSchema {
  constructor() {
    super();
    this.schema = {
      type: 'object',
      properties: {
        search_text: StringOptionalProperty,
        skip: NumberPositiveOrZeroProperty,
        limit: NumberPositiveOrZeroProperty
      },
      additionalProperties: false
    };
  }
}