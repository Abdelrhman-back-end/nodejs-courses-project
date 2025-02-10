const asyncwraper = require("../middleware/asyncwraper");
const User = require("../models/user_model");
const appError = require("../utils/appError");
const { message } = require("../utils/appError");
const httpStatustext = require("../utils/httpStatustext");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generatejwt = require("../utils/generate_jwt");
const { body } = require("express-validator");

const GetAllUsers = asyncwraper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: httpStatustext.Success, data: { users } });
});

const Register = asyncwraper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  const OldUser = await User.findOne({ email: email });
  if (OldUser) {
    const error = appError.create(
      "user alredy exists",
      400,
      httpStatustext.Fail
    );
    return next(error);
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashpassword,
    role,
  });

  const token = await generatejwt({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });
  newUser.token = token;
  await newUser.save();
  res
    .status(201)
    .json({ status: httpStatustext.Success, data: { User: newUser, token } });
});

const Login = asyncwraper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = appError.create(
      "email and password are requird",
      400,
      httpStatustext.Fail
    );
    return next(error);
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    const error = appError.create("user not found ", 400, httpStatustext.Fail);
    return next(error);
  }

  const MatchedPassword = await bcrypt.compare(password, user.password);
  if (user && MatchedPassword) {
    const token = await generatejwt({
      email: user.email,
      id: user._id,
      role: user.role,
    });
    res.status(200).json({ status: httpStatustext.Success, data: { token } });
  } else {
    const error = appError.create("something wrong", 500, httpStatustext.Fail);
    next(error);
  }
});

module.exports = {
  GetAllUsers,
  Register,
  Login,
};
