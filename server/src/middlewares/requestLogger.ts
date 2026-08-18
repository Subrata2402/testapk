import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.js';

// Helper to sanitize sensitive fields in objects
const sanitizeData = (data: any): any => {
  if (!data || typeof data !== 'object') return data;
  
  const sanitized = { ...data };
  const sensitiveFields = ['password', 'token', 'accesstoken', 'refreshtoken', 'clientsecret', 'googleclientid', 'authorization', 'cookie'];
  
  for (const key of Object.keys(sanitized)) {
    const lowerKey = key.toLowerCase();
    if (sensitiveFields.includes(lowerKey)) {
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
    
    const sanitizedBody = sanitizeData(body);
    const sanitizedHeaders = sanitizeData(req.headers);
    const sanitizedResponse = sanitizeData(parsedResponseBody);
    
    const responseStr = typeof sanitizedResponse === 'object' 
      ? JSON.stringify(sanitizedResponse) 
      : String(sanitizedResponse);
      
    logger.info(`[API] ${method} ${originalUrl} ${statusCode} - ${duration}ms - Headers: ${JSON.stringify(sanitizedHeaders)} - Body: ${JSON.stringify(sanitizedBody)} - Response: ${responseStr}`);
  });
  
  next();
};
