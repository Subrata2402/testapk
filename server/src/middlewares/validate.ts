import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { STRINGS } from '../constants/strings.js';

export const validate =
  (schema: ZodSchema) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        await schema.parseAsync({
          body: req.body,
          query: req.query,
          params: req.params,
        });
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const errors = error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          }));
          res.status(400).json({
            status: STRINGS.COMMON.STATUS_FAIL,
            message: STRINGS.COMMON.VALIDATION_FAILED,
            errors,
          });
          return;
        }
        next(error);
      }
    };
