import { Request, Response } from "express";
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id: string) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

const register = async (req: Request, res: Response) => {
  const { name, username, email, password } = req.body;

  const userName = await User.findOne({ username });
  const userMail = await User.findOne({ email });

  if (userMail) {
    res.status(422).json({ errors: ["Por favor, utilize outro e-mail"] });
    return;
  }

  if (userName) {
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
      .json({ erros: ["Houve um erro, por favor tente mais tarde."] });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

module.exports = { register };
