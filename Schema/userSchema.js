const UserSchema = {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
          example: 1,
        },
        name: {
          type: 'string',
          example: 'John Doe',
        },
        email: {
          type: 'string',
          example: 'john@example.com',
        },
        role: {
          type: 'string',
          enum: ['user', 'admin'],
          example: 'user',
        },
      },
    };
    
    module.exports = UserSchema;
    