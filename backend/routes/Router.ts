import { Request, Response } from "express";
import express from "express";
import { router as userRoute } from "./UserRoutes";
import { router as photoRoute } from "./PhotoRoutes";
export const router = express();

router.use("/api/users", userRoute);
router.use("/api/photos", photoRoute);

router.get("/", (req: Request, res: Response) => {
  res.send("API Working!");
});
