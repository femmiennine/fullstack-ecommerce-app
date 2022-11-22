import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dev from '../config/secrets';
import { comparePassword } from '../helper/password';
import { errorResponse, successResponse } from '../helper/responseHandler';
import User from '../models/users.model';

//POST Admin Login http://localhost:4000/api/v1/admin/login
export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorResponse(res, 400, `Please provide both email and password`);
    }
    const admin = await User.findOne({ email: email });
    if (!admin) {
      return errorResponse(
        res,
        404,
        `No Admin exist with this email and password`,
      );
    }
    if (admin.isVerified === 0) {
      return errorResponse(
        res,
        400,
        `Please verify your email address before login`,
      );
    }
    if (admin.isAdmin === 0) {
      return errorResponse(res, 403, `Forbidden Route!`);
    }
    const isPasswordMatched = await comparePassword(password, admin.password);
    if (!isPasswordMatched) {
      return errorResponse(res, 406, `Invalid Credentials`);
    }
    const token = jwt.sign({ id: admin._id }, String(dev.app.jwt), {
      algorithm: 'HS256',
      expiresIn: '1d',
    });
    console.log(token);
    res.cookie(String(admin._id), token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 200),
      httpOnly: true,
      sameSite: 'lax',
    });
    return successResponse(res, 200, `Admin successfully login`, token);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

//GET User Profile http://localhost:4000/api/v1/admin/admin-dashboard
export const adminDashboard = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ isAdmin: 0 });
    if (!users) {
      return errorResponse(res, 404, `No users found!`);
    }
    res.status(200).json({
      message: 'Users info returned successfully',
      users,
    });
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};
