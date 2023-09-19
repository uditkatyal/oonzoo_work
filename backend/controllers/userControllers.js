const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const generateToken = require("../util/generateToken");

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    let hashPassword;
    hashPassword = await bcrypt.hash(password, 10);
    if (!hashPassword) {
      res.status(500);
      throw new Error("Failed to encrypt password");
    }
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    if (user) {
      res.status(201).json({
        status: "Success",
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(500);
      throw new Error("Failed to create the user");
    }
  } catch (error) {
    const code = res.statusCode;
    console.log(code);
    res.status(res.statusCode).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginUser = await User.findOne({ email });
    if (!loginUser) {
      res.status(401);
      throw new Error("Invalid email or password");
    }
    let matchPassword = await bcrypt.compare(password, loginUser.password);
    console.log(matchPassword);
    if (loginUser && matchPassword) {
      res.status(200).json({
        status: "success",
        _id: loginUser._id,
        email: loginUser.email,
        name: loginUser.name,
        token: generateToken(loginUser._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    const statusCode = res.statusCode;
    console.log(statusCode);
    res.json({
      status: "fail",
      message: error.message,
    });
  }
};
