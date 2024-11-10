import { BaseSchema } from '../base/BaseSchema';
import {
    DateProperty,
    StringProperty,
    GenderProperty,
    ObjectIdArrayProperty,
    Base64ImageProperty
} from '../common/CommonSchemaProperties';

export class UpdateUserSchema extends BaseSchema {
    constructor() {
        super();
        this.schema = {
            type: 'object',
            properties: {
                name: StringProperty,
                gender: GenderProperty,
                birth_date: DateProperty,
                death_date: DateProperty,
                avatar: Base64ImageProperty,
                spouse_ids: ObjectIdArrayProperty,
                children_ids: ObjectIdArrayProperty
            },
            // No required fields for update
            additionalProperties: false
        };
    }
}