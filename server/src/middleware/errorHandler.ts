import { Request, Response, NextFunction } from 'express';

export const clientError = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404).send('Route not found!');
  next();
};

export const serverError = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(500).send('Something broke!');
  next();
};
