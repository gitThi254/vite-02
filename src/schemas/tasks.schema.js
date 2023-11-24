const { z } = require("zod");

exports.createTasksSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z
    .string({
      required_error: "Description is required",
    })
    .max(100, {
      message: "The description is larger than 100 characters",
    }),
});
