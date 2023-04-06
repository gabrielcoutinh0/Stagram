import express from "express";
const router = express.Router();
const { register } = require("../controllers/UserController");
const { userCreateValidation } = require("../middlewares/userValidations");
const validate = require("../middlewares/handleValidation");

router.post("/register", userCreateValidation(), validate, register);

module.exports = router;
