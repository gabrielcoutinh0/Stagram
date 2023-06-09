/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomValidator } from "express-validator";
import { body } from "express-validator";

export const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("Legenda é obrigatória.")
      .isString()
      .withMessage("Legenda é obrigatória."),

    body("image").custom((value: CustomValidator, { req }: any) => {
      if (!req.file) {
        throw new Error("A imagem é obrigatória.");
      }
      return true;
    }),
  ];
};

export const photoUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .not()
      .equals("undefined")
      .withMessage("Legenda é obrigatória."),
  ];
};

export const commentValidation = () => {
  return [
    body("comment").isString().withMessage("O comentário é obrigatório."),
  ];
};
