require('dotenv').config();
// create the install the instance of http from node.
const http = require('http');
// add the app.js file in your server.js.
const app = require('./app');
// create the instance of port either from env file if it is not available then use port no 3000.
const port = process.env.Port || 3000;

// create the instance of createServer and pass app as index file to run code for api or entry point.
const server = http.createServer(app);

// create the instance of listen server and pass port value.
server.listen(port);