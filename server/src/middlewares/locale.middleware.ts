import { Request, Response, NextFunction } from 'express';
import { localeStorage } from './localeStorage.js';

export const localeMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const acceptLanguage = req.headers['accept-language'] || 'en';
  // Parse Accept-Language header: e.g., "es-ES,es;q=0.9,en;q=0.8" -> "es"
  const lang = acceptLanguage.split(',')[0].split('-')[0].trim().toLowerCase();
  const supportedLanguages = ['en', 'es', 'pt', 'hi', 'fr', 'de', 'ja', 'zh', 'ar'];
  const locale = supportedLanguages.includes(lang) ? lang : 'en';

  localeStorage.run(locale, () => {
    next();
  });
};
