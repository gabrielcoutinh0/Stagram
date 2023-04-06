import { Request, Response } from "express";
import express from "express";
const router = express();

router.use("/api/users", require("./UserRoutes.ts"));

router.get("/", (req: Request, res: Response) => {
  res.send("API Working!");
});

module.exports = router;
