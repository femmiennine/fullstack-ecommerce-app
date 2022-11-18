import { Request, Response } from 'express';
import User from '../models/users.model';
import { hashedPassword } from '../helper/password';
import { errorResponse, successResponse } from '../helper/responseHandler';
import { sendVerificationEmail } from '../utils/sendVerificationEmail';

//GET all data of Users http://localhost:4000/api/v1/users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();
    return successResponse(res, 200, `Users found!`, allUsers);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

//DELETE a User by id http://localhost:4000/api/v1/users/:_id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const _id = req.params;
    const user = await User.findOne({ _id: _id });
    if (user) {
      await User.deleteOne({ _id: _id });
      return successResponse(res, 200, `Account succcessfully deleted!`, '');
    } else {
      return errorResponse(res, 404, `User does not exist.`);
    }
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

//UPDATE a User by id http://localhost:4000/api/v1/users/:_id
export const updateUser = async (req: Request, res: Response) => {
  try {
    const _id = req.params;
    const user = await User.findOne({ _id: _id });
    if (user) {
      await User.updateOne(
        { _id: _id },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
          },
        },
      );
    }
    return successResponse(res, 200, `User information updated!`, '');
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

//GET Register a User http://localhost:4000/api/v1/users/register
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !phone || !password) {
      return errorResponse(
        res,
        400,
        `Please provide a name, email, phone, and password.`,
      );
    }
    if (password.length < 8) {
      return errorResponse(
        res,
        400,
        `Password must be at least 8 characters long.`,
      );
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return errorResponse(res, 400, `User already exists.`);
    }
    const hashPassword = await hashedPassword(password);
    const newUser = new User({
      name,
      email,
      phone,
      password: hashPassword,
      isAdmin: 0,
      image: req.file?.filename,
    });
    const userData = await newUser.save();
    if (!userData) {
      return errorResponse(res, 400, `User unsucessfully registered!`);
    }
    if (userData) {
      sendVerificationEmail(userData.email, userData.name, userData._id);
      return successResponse(
        res,
        201,
        `Registration successful! Please verify your email address before login`,
        '',
      );
    } else {
      return errorResponse(res, 400, `Route not found!`);
    }
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};
