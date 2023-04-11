import { Request, Response } from "express";
const express = require("express");
export const router = express();

router.use("/api/users", require("./UserRoutes"));
router.use("/api/photos", require("./PhotoRoutes"));

router.get("/", (req: Request, res: Response) => {
  res.send("API Working!");
});

module.exports = router;
