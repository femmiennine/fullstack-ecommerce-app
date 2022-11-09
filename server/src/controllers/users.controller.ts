import { Request, Response, NextFunction } from 'express';
import { errorResponse, successResponse } from '../helper/responseHandler';
import User from '../models/users.model';

//GET /api/v1/users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.find();
    console.log(user);
    return successResponse(
      res,
      200,
      'Please check your email address to verify your account.',
    );
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};
