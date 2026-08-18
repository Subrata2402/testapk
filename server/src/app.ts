import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { rateLimiter } from './middlewares/rateLimiter.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { localeMiddleware } from './middlewares/locale.middleware.js';
import { checkMaintenanceMode } from './middlewares/maintenance.middleware.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { AppError } from './utils/appError.js';

import apiRoutes from './routes/index.js';

const app = express();

// Set security HTTP headers
app.use(helmet());

// Use locale middleware
app.use(localeMiddleware);

// Enable CORS
const corsOptions: cors.CorsOptions = {
  origin: env.CORS_ORIGIN == '*' ? '*' : env.CORS_ORIGIN.split(','),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// Limit requests from same API
app.use('/api', rateLimiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // Limit body size to prevent DOS
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Log requests and responses
app.use(requestLogger);

// Check maintenance mode
app.use('/api/v1', checkMaintenanceMode);

// Register routes
app.use('/api/v1', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the TestAPK API Server',
  });
});

// Robots.txt route
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

// Handle undefined routes
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(errorHandler);

export default app;
