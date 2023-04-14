import { Request, Response, NextFunction } from "express";
import { User } from "../models/User.model";
import jwt from "jsonwebtoken";
const jwtSecret = `${process.env.JWT_SECRET}`;

interface JwtPayload {
  id: string;
}

export const authGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ errors: ["Acesso negado!"] });

  try {
    if (authHeader !== undefined) {
      const { id } = jwt.verify(token, jwtSecret) as JwtPayload;
      req.user = await User.findById(id).select("-password");
      next();
    }
  } catch (error) {
    res.status(401).json({ erros: ["Token inválido."] });
  }
};
