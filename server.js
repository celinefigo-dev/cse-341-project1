const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const express = require('express');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected`);
      console.log(`Server is running on port ${port}`);
    });
  }
});