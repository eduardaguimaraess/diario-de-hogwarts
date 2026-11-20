export const createScheduleSchema = {
  body: {
    type: 'object',
    required: ['subject', 'professor', 'classroom', 'time', 'dayOfWeek'],
    additionalProperties: false,
    properties: {
      subject: { type: 'string', minLength: 1, maxLength: 100 },
      professor: { type: 'string', minLength: 1, maxLength: 100 },
      classroom: { type: 'string', minLength: 1, maxLength: 100 },
      time: { type: 'string', minLength: 1, maxLength: 30 },
      dayOfWeek: { type: 'string', minLength: 1, maxLength: 30 }
    }
  }
} as const;

export const updateScheduleSchema = {
  body: {
    type: 'object',
    minProperties: 1,
    additionalProperties: false,
    properties: {
      subject: { type: 'string', minLength: 1, maxLength: 100 },
      professor: { type: 'string', minLength: 1, maxLength: 100 },
      classroom: { type: 'string', minLength: 1, maxLength: 100 },
      time: { type: 'string', minLength: 1, maxLength: 30 },
      dayOfWeek: { type: 'string', minLength: 1, maxLength: 30 }
    }
  }
} as const;

export const paginationSchema = {
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1 },
      limit: { type: 'integer', minimum: 1, maximum: 50, default: 10 },
      search: { type: 'string', maxLength: 100, default: '' }
    },
    additionalProperties: false
  }
} as const;