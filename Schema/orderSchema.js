const OrderSchema = {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
          example: 1,
        },
        userId: {
          type: 'integer',
          example: 2,
        },
        totalAmount: {
          type: 'number',
          format: 'float',
          example: 100.00,
        },
        status: {
          type: 'string',
          enum: ['pending', 'completed'],
          example: 'pending',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2024-08-12T13:15:09.000Z',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          example: '2024-08-12T13:15:09.000Z',
        },
        OrderProducts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'int64',
                example: 1,
              },
              orderId: {
                type: 'integer',
                example: 1,
              },
              productId: {
                type: 'integer',
                example: 1,
              },
              quantity: {
                type: 'integer',
                example: 3,
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2024-08-12T13:15:09.000Z',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                example: '2024-08-12T13:15:09.000Z',
              },
              Product: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    format: 'int64',
                    example: 1,
                  },
                  name: {
                    type: 'string',
                    example: 'Adidas Samba (White)',
                  },
                  description: {
                    type: 'string',
                    example: 'Addidas Samba in white color',
                  },
                  price: {
                    type: 'number',
                    format: 'float',
                    example: 5900,
                  },
                  stockQuantity: {
                    type: 'integer',
                    example: 20,
                  },
                  category: {
                    type: 'string',
                    example: 'sneakers',
                  },
                  createdAt: {
                    type: 'string',
                    format: 'date-time',
                    example: '2024-08-12T13:14:09.000Z',
                  },
                  updatedAt: {
                    type: 'string',
                    format: 'date-time',
                    example: '2024-08-12T13:14:09.000Z',
                  },
                },
              },
            },
          },
        },
      },
      required: ['userId', 'totalAmount', 'status'],
    };
    
    module.exports = OrderSchema;
    