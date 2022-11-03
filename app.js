// Views
const airportRouter = require('./routes/airportRouter');
const flightRouter = require('./routes/flightRouter');
// Controllers and helpers
const globalErrorHandler = require('./helpers/globalErrorHandler');
const AppError = require('./helpers/appError');
// Utils
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
// ::::::::::::::::::::::::IMPORTS END:::::::::::::::::::::::::::::

const app = express();

// Enable Proxy
app.enable('trust proxy');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// GLOBAL MIDDLEWARES

//implement CORS
app.use(cors());
app.options('*', cors());

// Secure http headers
app.use(
  helmet()
  //     {
  //     crossOriginEmbedderPolicy: false,
  //     crossOriginResourcePolicy: {
  //       allowOrigins: ['*']
  //     },
  //     contentSecurityPolicy: {
  //       directives: {
  //         defaultSrc: ['*'],
  //         scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"]
  //       }
  //     }
  //   }
);

// Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from same ip
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again later'
});
app.use('/api', limiter);

// Body parser / Body limiter
app.use(
  express.json({
    limit: '10kb'
  })
);

// Cookie Parser
app.use(cookieParser());

// URL Encoder
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//Use compression
app.use(compression());

// Data sanitization against XSS
app.use(xss());

// prevent parameter pollution
app.use(
  hpp({
    whitelist: []
  })
);

// Routes
app.use('/api/airports', airportRouter);
app.use('/api/flights', flightRouter);

// 404 Not Found
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

// Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
