import { Request } from "express";
import { CustomValidator } from "express-validator";
const { body } = require("express-validator");

export const userCreateValidation = () => {
  type RequestBody<T> = Request<{}, {}, T>;
  interface IUserBody {
    name: string;
    userName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }
  // const isValidEmail: CustomValidator = (value) => {
  //   return User.findUserByEmail(value).then((user: string) => {
  //     if (user) {
  //       return Promise.reject("E-mail já cadastrado.");
  //     }
  //   });
  // };

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
      .custom((value: string, { req }: any) => {
        if (value != req.body.password) {
          throw new Error("As senhas não são iguais.");
        }
        return true;
      }),
  ];
};

module.exports = { userCreateValidation };
