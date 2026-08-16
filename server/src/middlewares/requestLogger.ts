import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.js';

// Helper to sanitize sensitive fields in objects
const sanitizeData = (data: any): any => {
  if (!data || typeof data !== 'object') return data;
  
  const sanitized = { ...data };
  const sensitiveFields = ['password', 'token', 'accessToken', 'refreshToken', 'clientSecret', 'googleClientId'];
  
  for (const key of Object.keys(sanitized)) {
    if (sensitiveFields.includes(key)) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof sanitized[key] === 'object') {
      sanitized[key] = sanitizeData(sanitized[key]);
    }
  }
  
  return sanitized;
};

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl, body } = req;
  
  // Skip logging for health check endpoints
  if (originalUrl === '/api/v1/admin/health' || originalUrl === '/api/v1/health') {
    return next();
  }

  const start = Date.now();
  
  // Log incoming request
  const sanitizedBody = sanitizeData(body);
  logger.info(`[Request] ${method} ${originalUrl} - Body: ${JSON.stringify(sanitizedBody)}`);
  
  // Capture response body
  const originalSend = res.send;
  let responseBody: any;
  
  res.send = function (chunk) {
    responseBody = chunk;
    return originalSend.apply(res, arguments as any);
  };
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    
    let parsedResponseBody = responseBody;
    if (typeof responseBody === 'string') {
      try {
        parsedResponseBody = JSON.parse(responseBody);
      } catch (e) {
        // Not JSON
      }
    }
    
    const sanitizedResponse = sanitizeData(parsedResponseBody);
    let responseStr = typeof sanitizedResponse === 'object' 
      ? JSON.stringify(sanitizedResponse) 
      : String(sanitizedResponse);
      
    // Truncate response body if it is too long to prevent log bloat
    // if (responseStr && responseStr.length > 500) {
    //   responseStr = responseStr.substring(0, 500) + '... [TRUNCATED]';
    // }
    
    logger.info(`[Response] ${method} ${originalUrl} ${statusCode} - ${duration}ms - Body: ${responseStr}`);
  });
  
  next();
};
