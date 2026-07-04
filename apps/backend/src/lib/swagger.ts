import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'actually.mi API',
      version: '1.0.0',
      description: 'REST API for actually.mi social platform',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./apps/backend/src/routes/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
