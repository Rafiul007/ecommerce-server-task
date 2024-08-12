const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config();

const UserSchema = require('../Schema/userSchema');
const ProductSchema = require('../Schema/productSchema');
const OrderSchema = require('../Schema/orderSchema');
const port = process.env.PORT ;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API documentation for the E-commerce application',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: UserSchema,
        Product: ProductSchema,
        Order: OrderSchema,
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
