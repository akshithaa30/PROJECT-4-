// Import dependencies
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Create the Express app
const app = express();

// Set the view engine (assuming you are using Pug)
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev')); // Logs requests to the console
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: false })); // Parses form submissions
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Serves static files

// Routes
const indexRouter = require('./app_server/routes/index');
app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('index', {
    title: 'Error',
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
