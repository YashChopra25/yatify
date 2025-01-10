import bcryptjs from "bcryptjs";
import { User } from "../models/userModel.js";
import { CustomError } from "../utils/error.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { validateEmail } from "../utils/general.js";
import { GenerateAuthToken } from "../utils/GenerateAuthToken.js";
import validator from "validator";
class ClassAuthControllers {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .send({ success: false, message: "All fields are required" });
      }

      if (password.length < 6) {
        return res.status(400).send({
          success: false,
          message: "Password must be at least 6 characters",
        });
      }
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).send({
          success: false,
          message: "Please login with you register account",
        });
      }
      const hashedPassword = await bcryptjs.hash(password, user.salt);
      if (hashedPassword !== user.password) {
        return res.status(401).send({
          success: false,
          message: "Please login with you register account",
        });
      }
      const { password: _, salt, ...restData } = user._doc;
      const token = GenerateAuthToken(restData);

      res.cookie("token", token, {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      });
      res.send({
        message: "Login Successfully",
        success: true,
        data: restData,
      });
    } catch (error) {
      ErrorHandler(error, req, res);
    }
  }
  async register(req, res) {
    try {
      const { name, username, password, email, imgSrc } = req.body;
      if (!name || !username || !password || !email) {
        return res.status(400).send({ message: "All fields are required" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .send({ message: "Password must be at least 6 characters" });
      }

      if (!validator.isEmail(email)) {
        return res.status(400).send({ message: "Invalid email address." });
      }

      if (username.length < 3) {
        return res
          .status(400)
          .send({ message: "Username must be at least 3 characters" });
      }

      const IsUserExist = await User.findOne({
        $or: [
          { username: { $regex: new RegExp(`^${username}$`, "i") } },
          { email: { $regex: new RegExp(`^${email}$`, "i") } },
        ],
      });
      if (IsUserExist) {
        return res.status(400).send({
          message: "Username or Email already exists. Please try another one",
        });
      }

      const user = await User.create({
        name,
        username,
        password,
        email,
        imgSrc,
      });
      if (!user) {
        return res.status(400).send({ message: "Something went wrong" });
      }
      const newUser = user.toObject();
      const { password: _, salt, ...restUser } = newUser; // Remove password from response

      const token = GenerateAuthToken(restUser);

      res.setHeader("Authorization", `Bearer ${token}`);
      res.cookie("token", token, {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      });
      res.send({
        message: "register",
        success: "success",
        data: restUser,
      });
    } catch (err) {
      ErrorHandler(err, req, res);
    }
  }
  async forgotPassword(req, res) {
    try {
      const { email } = req.headers;

      if (!email || email.trim() === "") {
        throw new CustomError("Email is required");
      }
      if (!validateEmail(email)) {
        throw new CustomError("Email is not validate,please verify the email");
      }
      const fetchUser = await User.findOne({ email });
      if (!fetchUser) {
        throw new CustomError(
          "The email is not register with us...,Please register first"
        );
      }
      const token = GenerateAuthToken({
        username: fetchUser.username,
        email: fetchUser.email,
        id: fetchUser._id,
      });

      const hashToken = await bcryptjs.hash(email, 10);
      sendMail(
        email,
        "Forgot Password Email from Yatify",
        "ForgotPassword",
        hashToken
      );
      fetchUser.forgotPasswordToken = hashToken;
      fetchUser.forgotPasswordTokenExpiry = Date.now() + 30 * 60 * 1000;
      await fetchUser.save();
      res.status(200).send({
        success: true,
        message: "Please check your email to reset your password",
      });
    } catch (error) {
      ErrorHandler(error, req, res);
    }
  }
  async resetPassword(req, res) {
    try {
      res.send("resetPassword");
    } catch (error) {
      ErrorHandler(error, req, res);
    }
  }
  async changePassword(req, res) {
    try {
      res.send("changePassword");
    } catch (error) {
      ErrorHandler(error, req, res);
    }
  }
  async verifyToken(req, res) {
    try {
      const user = req.user;
      const { password: _, salt, ...restData } = user._doc;

      return res.json({
        success: true,
        data: restData,
      });
    } catch (error) {
      res.cookie("token", "", {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
      });
      ErrorHandler(error, req, res);
    }
  }
  async updateUser(req, res) {
    try {
      const { name, username, email } = req.body;

      let updateField = {};
      if (name) updateField.name = name;
      if (username) updateField.username = username;
      if (email) updateField.email = email;

      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: updateField },
        { new: true }
      );

      if (!user) {
        return res.status(400).send({
          message: "Something went wrong,whilte updating the profile",
          success: false,
        });
      }
      const { password: _, salt, ...restData } = user._doc;

      return res.status(200).send({
        message: "Updated successfully",
        data: restData,
        success: true,
      });
    } catch (error) {
      ErrorHandler(error, req, res);
    }
  }
  async SearchUser(req, res) {
    try {
      const { query } = req.params;

      if (!query || (query && query.trim() === "")) {
        throw new CustomError("Provide at least three characters");
      }
      const userList = await User.find({
        $or: [
          { name: { $regex: query, $options: "i" } }, //i is for case insensitive,
          { username: { $regex: query, $options: "i" } }, //i is for case insensitive,
          { email: { $regex: query, $options: "i" } }, //i is for case insensitive,
        ],
        _id: { $ne: req.user.id },
      }).select("name username email _id imgSrc");

      return res.status(200).send({
        message: "User List found",
        success: true,
        data: userList,
      });
    } catch (error) {
      ErrorHandler(error, req, res);
    }
  }
  async logout(req, res) {
    try {
      res.cookie("token", "", {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
      });
      res.send({ success: true, message: "logout", data: {} });
    } catch (error) {
      ErrorHandler(error, req, res);
    }
  }
}
const AuthController = new ClassAuthControllers();
export default AuthController;
