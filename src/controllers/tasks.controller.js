const CustomeError = require("../Utils/CustomError");
const asyncErrorhandler = require("../Utils/asyncErrorhandler");
const Task = require("../models/task.model");

exports.createTasks = asyncErrorhandler(async (req, res, next) => {
  const task = await Task.create({ ...req.body, user: req.user.id });
  res.status(201).json({
    data: task,
  });
});

exports.getTasks = asyncErrorhandler(async (req, res, next) => {
  const tasks = await Task.find({ user: req.user.id });
  res.status(201).json({
    data: tasks,
  });
});

exports.updateTask = asyncErrorhandler(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task)
    return next(
      new CustomeError(`Task with ID that ${req.params.id} not found`, 404)
    );
  res.json({
    data: task,
  });
});

exports.deleteTask = asyncErrorhandler(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task)
    return next(
      new CustomeError(`Task with ID that ${req.params.id} not found`, 404)
    );
  res.json({
    data: task,
  });
});

exports.getTask = asyncErrorhandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task)
    return next(
      new CustomeError(`Task with ID that ${req.params.id} not found`, 404)
    );
  res.json({
    data: task,
  });
});
