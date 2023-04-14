import { Request, Response, NextFunction } from "express";
import { ValidationError, validationResult } from "express-validator";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErros: string[] = [];

  errors
    .array()
    .map((error: ValidationError) => extractedErros.push(error.msg));

  return res.status(422).json({
    errors: extractedErros,
  });
};
