export const ObjectIdPattern = {
  type: 'string',
  pattern: '^[0-9a-fA-F]{24}$'
};

export const StringProperty = {
  type: 'string',
  minLength: 1
};

export const ArrayStringProperty = {
  type: 'array',
  items: StringProperty,
  minItems: 1
};

export const NumberPositiveProperty = {
  type: 'number',
  min: 1
};

export const NumberProperty = { type: 'number' };

export const BooleanProperty = { type: 'boolean' };

export const GenderProperty = {
  type: 'string',
  enum: ['male', 'female']
};

export const DateProperty = {
  type: 'string',
  format: 'date'
};

export const ObjectIdArrayProperty = {
  type: 'array',
  items: ObjectIdPattern,
  uniqueItems: true
};

export const Base64ImageProperty = {
  type: 'string',
  pattern: '^data:image\/(jpeg|png|gif);base64,'
};