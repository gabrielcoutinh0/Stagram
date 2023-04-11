/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomValidator } from "express-validator";
const { body } = require("express-validator");

const photoInsertValidation = () => {
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

module.exports = { photoInsertValidation };
