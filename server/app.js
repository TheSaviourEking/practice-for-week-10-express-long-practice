const express = require('express');

// using dotenv
// require('dotenv').config({path: './env/.env'});

// express-async-errors
require('express-async-errors');

// Custom Middlewares
const logger = require('./middleware/logger.js');
const { error, errorMiddleware } = require('./middleware/error.js');

// routes
const dogs = require('./routes/dogs.js');

const app = express();

// logger middleware
app.use(logger);

// express.static
app.use('/static', express.static('./assets'));

// express.json()
app.use(express.json());

// For testing purposes, GET /
app.get('/', (req, res) => {
  res.json("Express server running. No content provided at root level. Please use another route.");
});

app.use('/dogs', dogs);

// For testing express.json middleware
app.post('/test-json', (req, res, next) => {
  // send the body as JSON with a Content-Type header of "application/json"
  // finishes the response, res.end()
  res.json(req.body);
  next();
});

// For testing express-async-errors
app.get('/test-error', async (req, res) => {
  throw new Error("Hello World!")
});

// error middlewares
app.use(error);
app.use(errorMiddleware)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}, and currently running in '${process.env.NODE_ENV.toUpperCase()}'`));
