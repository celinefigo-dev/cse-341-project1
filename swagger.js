
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'CSE 341 Contacts Project'
  },
  host: 'cse-341-project1-t0e6.onrender.com',
  schemes: ['http']
};

const outputFile = './swagger.json';
const routes = ['./routes/contacts.js'];

swaggerAutogen(outputFile, routes, doc);