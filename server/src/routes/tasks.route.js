const { Router } = require("express");
const { authRequired } = require("../middlewares/authRequired");
const {
  createTasks,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");
const { validateSchema } = require("../middlewares/validator.middleware");
const { createTasksSchema } = require("../schemas/tasks.schema");
const router = Router();

router
  .route("/")
  .get(authRequired, getTasks)
  .post(authRequired, validateSchema(createTasksSchema), createTasks);

router
  .route("/:id")
  .get(authRequired, getTask)
  .put(authRequired, updateTask)
  .delete(authRequired, deleteTask);
module.exports = router;
