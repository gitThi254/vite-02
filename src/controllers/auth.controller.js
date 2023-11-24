const CustomeError = require("../Utils/CustomError");
const asyncErrorhandler = require("../Utils/asyncErrorhandler");
const createAccessToken = require("../libs/jwt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.register = asyncErrorhandler(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    data: newUser,
  });
});

exports.login = asyncErrorhandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await user.comparePW(req.body.password)))
    return next(new CustomeError("Incorrect email or password", 401));

  const token = await createAccessToken({ id: user._id });
  res.cookie("token", token);
  res.json({
    data: {
      username: user.username,
      email: user.email,
    },
  });
});

exports.logout = asyncErrorhandler(async (req, res, next) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.sendStatus(200);
});

exports.verifyToken = asyncErrorhandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new CustomeError("You are not logged in", 401));
  jwt.verify(token, process.env.SECRET_JWT, async (err, token) => {
    if (err)
      return next(
        new CustomeError(
          "Invalid token or token expired , you are logged again!",
          401
        )
      );
    const userFound = await User.findById(token.id);
    if (!userFound) return next(new CustomeError("User not found", 404));
    res.json({
      username: userFound.username,
      email: userFound.email,
    });
  });
});
