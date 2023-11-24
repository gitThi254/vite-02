const CustomeError = require("../Utils/CustomError");

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  if (error.code === 11000)
    error = new CustomeError(
      "Email address exists, Please use another email!",
      400
    );
  res.status(error.statusCode).json([error.message]);
};
