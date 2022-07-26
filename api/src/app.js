const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require("cors");

// Import routes
const videogames = require("./routes/videogames.route.js");
const genres = require("./routes/genres.route.js");
const home = require("./routes/home.route.js");
const platforms = require("./routes/platforms.route.js");

require('./db.js');

const server = express();

server.name = 'API';

server.use(express.json());
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', "true");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});



// Routes

server.use("/", home);
server.use("/videogames", videogames);
server.use("/genres", genres);
server.use("/platforms", platforms);





// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
