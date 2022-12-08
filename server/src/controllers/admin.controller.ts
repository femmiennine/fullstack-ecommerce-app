import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dev from '../config/secrets';
import { comparePassword } from '../helper/password';
import { errorResponse, successResponse } from '../helper/responseHandler';
import { IJWTToken } from '../middleware/auth';
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
      return errorResponse(res, 401, `Forbidden Route! Unauthorized login.`);
    }
    if (admin.isBanned === true) {
      return errorResponse(
        res,
        401,
        `Your account is temporarily blocked. Please try again later.`,
      );
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
      expires: new Date(Date.now() + 1000 * 200 * 60 * 60),
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
    const user = await User.findOne({ isAdmin: 1 });
    if (!user) {
      return errorResponse(res, 404, `Admin not found!`);
    }
    res.status(200).json({
      message: 'Admin info returned successfully',
      user,
    });
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

//POST Logout User http://localhost:4000/api/v1/admin/logout
export const logoutAdmin = async (req: Request, res: Response) => {
  try {
    if (!req.headers.cookie) {
      return res.status(404).send({
        message: 'No cookie found',
      });
    }
    const token = req.headers.cookie.split('=')[1];
    if (!token) {
      return errorResponse(res, 404, `No token found`);
    }
    jwt.verify(token, String(dev.app.jwt), function (error, decoded) {
      if (error) {
        console.log(error);
      }
      console.log(decoded);
      res.clearCookie(`${(decoded as IJWTToken).id}`);
    });
    return successResponse(res, 200, `Admin logged out successfully`, '');
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

//POST Logout User http://localhost:4000/api/v1/admin/user-access/:_id
export const userAccess = async (req: Request, res: Response) => {
  try {
    const userId = await User.findById({ _id: req.params._id });
    if (!userId) {
      return errorResponse(res, 404, 'User does not exist');
    }
    if (userId.isBanned === false) {
      const blockUser = await User.updateOne(
        { _id: req.params._id },
        {
          $set: {
            isBanned: true,
          },
        },
      );
      return successResponse(res, 200, `User blocked successfully`, blockUser);
    } else {
      const unBlockUser = await User.updateOne(
        { _id: req.params._id },
        { $set: { isBanned: false } },
      );
      return successResponse(
        res,
        200,
        `User unblocked successfully`,
        unBlockUser,
      );
    }
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};
