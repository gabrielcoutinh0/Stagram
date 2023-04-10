import { Request, Response } from "express";
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = `${process.env.JWT_SECRET}`;

const generateToken = (id: string) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "7d" });
};

const register = async (req: Request, res: Response) => {
  const { name, username, email, password } = req.body;

  const userMail = await User.findOne({ email });
  const userName = await User.findOne({ username });

  if (userMail) {
    res.status(422).json({ errors: ["Por favor, utilize outro e-mail"] });
    return;
  } else if (userName) {
    res.status(422).json({ errors: ["Por favor, utilize outro username"] });
    return;
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    username,
    email,
    password: passwordHash,
  });

  if (!newUser) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado."] });
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha inválida."] });
    return;
  }

  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

const getCurrentUser = async (req: Request, res: Response) => {
  const user = req.user;
  res.status(200).json(user);
};

module.exports = { register, login, getCurrentUser };
