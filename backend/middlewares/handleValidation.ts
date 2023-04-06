import { Request, Response, NextFunction } from "express";
const { validationResult } = require("express-validator");

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErros: string[] = [];

  errors.array().map((error: any) => extractedErros.push(error.msg));

  return res.status(422).json({
    errors: extractedErros,
  });
};

module.exports = validate;
