import { Request, Response } from "express";
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id: string) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

const register = (req: Request, res: Response) => {
  return res.status(200).send("Registro");
};

module.exports = { register };
