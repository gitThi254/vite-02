const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const CustomeError = require("./Utils/CustomError");
const globalErrorHandler = require("./controllers/err.controller");
const authRoutes = require("./routes/auth.route");
const taskRoutes = require("./routes/tasks.route");
const app = express();

app.use(express.json());

app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/users", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.all("*", (req, res, next) => {
  return next(
    new CustomeError(`Can't not ${req.originalUrl} on the server!`, 404)
  );
});
app.use(globalErrorHandler);

module.exports = app;
