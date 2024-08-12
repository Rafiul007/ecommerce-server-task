const ProductSchema = {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
          example: 1,
        },
        name: {
          type: 'string',
          example: 'Smartphone',
        },
        description: {
          type: 'string',
          example: 'Latest model with advanced features',
        },
        price: {
          type: 'number',
          format: 'float',
          example: 299.99,
        },
        stockQuantity: {
          type: 'integer',
          example: 50,
        },
        category: {
          type: 'string',
          example: 'Electronics',
        },
      },
      required: ['name', 'price', 'stockQuantity', 'category'],
    };
    
    module.exports = ProductSchema;
    