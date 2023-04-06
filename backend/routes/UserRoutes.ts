import express from "express";
const router = express.Router();
const { register, login } = require("../controllers/UserController");
const {
  userCreateValidation,
  loginValidation,
} = require("../middlewares/userValidations");
const validate = require("../middlewares/handleValidation");

router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);

module.exports = router;
