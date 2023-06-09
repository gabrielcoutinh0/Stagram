import { CustomValidator } from "express-validator";
import { body } from "express-validator";

export const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),

    body("username")
      .isString()
      .withMessage("O username é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O username precisa ter no mínimo 3 caracteres."),

    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório.")
      .isEmail()
      .withMessage("Insira um e-mail válido."),

    body("password")
      .isString()
      .withMessage("A senha é obrigatória.")
      .isLength({ min: 5 })
      .withMessage("A senha precisa ter no mínimo 5 caracteres"),

    body("passwordConfirmation")
      .isString()
      .withMessage("A confirmação de senha é obrigatória.")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .custom((value: CustomValidator, { req }: any) => {
        if (value != req.body.password) {
          throw new Error("As senhas não são iguais.");
        }
        return true;
      }),
  ];
};

export const loginValidation = () => {
  return [
    body("username")
      .isString()
      .withMessage("O username é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O username precisa ter no mínimo 3 caracteres."),

    body("password").isString().withMessage("A senha é obrigatória."),
  ];
};

export const userUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
  ];
};
