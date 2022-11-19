import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/users.model';
import { comparePassword, hashedPassword } from '../helper/password';
import { errorResponse, successResponse } from '../helper/responseHandler';
import { sendVerificationEmail } from '../utils/sendVerificationEmail';
import dev from '../config/secrets';

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

//POST Register a User http://localhost:4000/api/v1/users/register
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password, phone } = req.body;
    if (!firstname || !lastname || !email || !phone || !password) {
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
      firstname,
      lastname,
      email,
      phone,
      password: hashPassword,
      isAdmin: 0,
      isVerified: 0,
      image: req.file?.filename,
    });
    const userData = await newUser.save();
    if (!userData) {
      return errorResponse(res, 400, `User unsucessfully registered!`);
    }
    if (userData) {
      sendVerificationEmail(
        userData.email,
        userData.firstname,
        userData.lastname,
        userData._id,
      );
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

//POST Verify User http://localhost:4000/api/v1/users/verify-user
export const verifyUser = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const userUpdated = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          isVerified: 1,
        },
      },
    );
    if (userUpdated) {
      return successResponse(res, 201, `User verification successful`, '');
    } else {
      return errorResponse(res, 400, `User verification unsuccessfu!`);
    }
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

//POST Login User http://localhost:4000/api/v1/users/login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return errorResponse(res, 400, `Please provide both email and password`);
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return errorResponse(
        res,
        404,
        `No user exist with this email and password`,
      );
    }
    if (user.isVerified === 0) {
      return errorResponse(
        res,
        400,
        `Please verify your email address before login`,
      );
    }
    const isPasswordMatched = await comparePassword(password, user.password);
    if (!isPasswordMatched) {
      return errorResponse(res, 406, `Invalid Credentials`);
    }
    const token = jwt.sign({ id: user._id }, String(dev.app.jwt), {
      algorithm: 'HS256',
      expiresIn: '1d',
    });
    console.log(token);
    res.cookie(String(user._id), token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 200),
      httpOnly: true,
      sameSite: 'lax',
    });
    return successResponse(res, 200, `User successfully login`, token);
  } catch (error: any) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
