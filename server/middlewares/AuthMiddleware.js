import { User } from "../models/userModel.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { decodeToken } from "../utils/GenerateAuthToken.js";
import mongoose from "mongoose";
const authMiddleware = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res
        .status(401)
        .send({ success:false, message: "Unauthorized access" });
    }
    next();
  };
};

const AuthTokenMiddleware = async (req, res, next) => {
  try {
    const token =
      (req.cookies.token && req.cookies.token) ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!token) {
      return res
        .status(401)
        .send({ success:false, message: "Unauthorized access" });
    }

    const { _id } = await decodeToken(token);

    if (!_id || !mongoose.isValidObjectId(_id)) {
      throw new CustomError(
        "Invalid Format for the following fields: _id",
        400
      );
    }

    // Use findById with proper error handling
    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(401)
        .send({ success:false, message: "Unauthorized access" });
    }

    req.user = user;
    next();
  } catch (error) {
    ErrorHandler(error, req, res);
  }
};

export { authMiddleware, AuthTokenMiddleware };
