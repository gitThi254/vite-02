const { Router } = require("express");
const router = Router();
const {
  register,
  login,
  logout,
  verifyToken,
} = require("./..//controllers/auth.controller");
const { validateSchema } = require("../middlewares/validator.middleware");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);

module.exports = router;
