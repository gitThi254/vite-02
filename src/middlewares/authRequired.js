const CustomeError = require("../Utils/CustomError");
const asyncErrorhandler = require("../Utils/asyncErrorhandler");
const jwt = require("jsonwebtoken");

exports.authRequired = asyncErrorhandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new CustomeError("You are not logged in!", 401));
  jwt.verify(token, process.env.SECRET_JWT, async (err, user) => {
    if (err)
      return next(
        new CustomeError(
          "Invalid token or token expired, you are loggin again!",
          401
        )
      );
    req.user = user;
    next();
  });
});
