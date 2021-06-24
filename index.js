'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const { db } = require('./api-server/src/models/index');
const server = require('./api-server/src/server');

db.sync().then(() => {
  server.start(3000);
});