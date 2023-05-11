import { Router } from "express";
export const router = Router();
import {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
  getUserByUsername,
  getAllUser,
} from "../controllers/UserController";
import {
  userCreateValidation,
  loginValidation,
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
router.get("/:id", getUserByUsername);
router.get("/id/:id", getUserById);
router.get("/", getAllUser);
