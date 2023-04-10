import express from "express";
const router = express.Router();
const {
  register,
  login,
  getCurrentUser,
} = require("../controllers/UserController");
const {
  userCreateValidation,
  loginValidation,
} = require("../middlewares/userValidations");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");

router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);

module.exports = router;
