import { BaseSchema } from '../base/BaseSchema';
import { ObjectIdPattern } from '../common/CommonSchemaProperties';

export class GetUserSchema extends BaseSchema {
    constructor() {
        super();
        this.schema = {
            type: 'object',
            properties: {
                id: ObjectIdPattern
            },
            required: ['id'],
            additionalProperties: false
        };
    }
}