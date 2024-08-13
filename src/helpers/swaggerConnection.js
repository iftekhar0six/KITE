"use strict";

require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");

/**
 * Options for swagger
 */
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "KITE API",
      version: "1.0.0",
      description: "API documentation for KITE",
    },
    servers: [
      {
        url: process.env.BASE_URL,
        description: "KITE Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./swaggerDocuments/admin/*.js", "./swaggerDocuments/user/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerSpec };
