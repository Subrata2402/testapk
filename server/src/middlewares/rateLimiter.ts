import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';
import { STRINGS } from '../constants/strings.js';

export const rateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: 429,
    message: STRINGS.COMMON.TOO_MANY_REQUESTS,
  },
});
