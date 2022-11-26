import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const registerAdminValidator = [
  check('email').normalizeEmail().isEmail().withMessage('Not a valid email'),
  check('password').notEmpty().withMessage('Password is missing'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
