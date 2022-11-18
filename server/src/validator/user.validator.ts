import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const registerUserValidator = [
  check('firstname').notEmpty().withMessage('Firstname is missing'),
  check('lastname').notEmpty().withMessage('Lastname is missing'),
  check('email').normalizeEmail().isEmail().withMessage('Not a valid email'),
  check('password').notEmpty().withMessage('Password is missing'),
  check('phone').notEmpty().withMessage('Phone is missing'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
