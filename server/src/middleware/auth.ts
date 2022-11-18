import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { errorResponse } from '../helper/responseHandler';
import dev from '../config/secrets';

export interface ICustomRequest extends Request {
  id: string | JwtPayload;
}

export interface IJWTToken {
  id: string;
}

export const isAuthorized = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.headers.cookie) {
      return errorResponse(res, 404, `No cookie found!`);
    }

    const token = req.headers.cookie.split('=')[1];

    if (!token) {
      return errorResponse(res, 404, `No token found!`);
    }

    jwt.verify(token, String(dev.app.jwt), function (error, decoded) {
      if (error) {
        console.log(error);
      }
      console.log(decoded);
      (req as ICustomRequest).id = (decoded as IJWTToken).id;
      next();
    });
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};
