import { Router } from "express";
export const router = Router();
import {
  register,
  login,
  getCurrentUser,
  passwordUpdate,
  update,
  getUserById,
} from "../controllers/UserController";
import {
  userCreateValidation,
  loginValidation,
  newPasswordUpdateValidation,
  userUpdateValidation,
} from "../middlewares/userValidations";
import { authGuard } from "../middlewares/authGuard";
import { validate } from "../middlewares/handleValidation";
import { imageUpload } from "../middlewares/imageUpload";

router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put(
  "/",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),
  update
);
router.put(
  "/newpassword",
  authGuard,
  newPasswordUpdateValidation(),
  validate,
  passwordUpdate
);
router.get("/:id", getUserById);
