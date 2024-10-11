import { User } from "../schema/userSchema.js";
const login = (req, res) => {
  const { username, password } = req.body;
  res.send({
    message: "login",
    status: "success",
    data: {
      username,
      password,
    },
  });
};
const register = async (req, res) => {
  try {
    const { name, username, password, email, imgSrc } = req.body;
    if (
      !name.trim() ||
      !username.trim() ||
      !password.trim() ||
      !email.trim() ||
      !imgSrc.trim()
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .send({ message: "Password must be at least 6 characters" });
    }
    const regrexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regrexEmail.test(email)) {
      return res.status(400).send({ message: "Invalid email address" });
    }

    if (username.length < 3) {
      return res
        .status(400)
        .send({ message: "Username must be at least 3 characters" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .send({ message: "Username already exists. Please try another one" });
    }

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res
        .status(400)
        .send({ message: "Email already exists. Please try another one" });
    }

    const newUser = new User({
      name,
      username,
      password,
      email,
      imgSrc,
    });
    await newUser.save();

    if (!newUser) {
      return res.status(400).send({ message: "Something went wrong" });
    }

    res.send({
      message: "register",
      status: "success",
      newUser,
    });
  } catch (error) {}
  res.send("register");
};
const forgotPassword = (req, res) => {
  res.send("forgotPassword");
};
const resetPassword = (req, res) => {
  res.send("resetPassword");
};
const changePassword = (req, res) => {
  res.send("changePassword");
};

export default {
  login,
  register,
  forgotPassword,
  resetPassword,
  changePassword,
};
