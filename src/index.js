// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env, ipAddress } = require('./config/vars');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

// listen to requests
app.listen(port, () => console.info(`server started on ${ipAddress}:${port} (${env})`));

/**
* Exports express
* @public
*/
module.exports = app;
