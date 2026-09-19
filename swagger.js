
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'CSE 341 Contacts Project',
    version: '1.0.0' 
  },
    host: 'cse-341-project1-t0e6.onrender.com',
    basePath: '/contacts',
    schemes: ['https']
};

const outputFile = './swagger.json';
const routes = ['./routes/contacts.js'];

swaggerAutogen(outputFile, routes, doc);