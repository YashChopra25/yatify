import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { CustomError } from "../utils/error.js";

export const messageMiddleware = async (req, res, next) => {
  try {
    const { receiver } = req.headers;
    const sender = req.user;
    const invalidFields = [];
    if (receiver) {
      if (!mongoose.isValidObjectId(sender?._id)) invalidFields.push("sender");
      if (!mongoose.isValidObjectId(receiver)) invalidFields.push("receiverr");

      if (invalidFields.length > 0) {
        throw new CustomError(
          `Invalid Format for the following fields: ${invalidFields.join(", ")}`
        );
      }
      if (sender?._id.toString() === receiver?.toString()) {
        throw new CustomError("You can't send message to yourself.", 400);
      }
      const receiverUser = await User.findById(receiver);
      if (!receiverUser) {
        throw new CustomError("The receiver was not found", 404);
      }
      req.receiver = receiverUser;
    }

    req.sender = sender;
    next();
  } catch (error) {
    ErrorHandler(error, req, res);
  }
};
