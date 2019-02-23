import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
const swaggerDefinition = {
  info: { // API informations (required)
    title: 'Nibble API', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'A sample API', // Description (optional)
  },
  host: 'localhost:3000', // Host (optional)
  basePath: '/', // Base path (optional)
};

// Options for the swagger docs
const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  apis: ['src/routes/*.ts'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
export default {
  swaggerUi,
  spec: swaggerJSDoc(options),
};
