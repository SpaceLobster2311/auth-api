'use strict';
// start api-server code
const express = require('express');

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');

const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js')
const authRoutes = require('./routes/authRoutes.js');
const app = express();
// 3rd Party Resources
const cors = require('cors');
const morgan = require('morgan');
// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(authRoutes);
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

app.use('*', notFoundHandler);
app.use(errorHandler);

// end api-server code

//start auth-server code

module.exports = {
  server: app,
  start: PORT => {
    if (!PORT) { throw new Error('Missing Port'); }
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};