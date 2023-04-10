import { Request, Response } from "express";
import { Types } from "mongoose";
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

const update = async (req: Request, res: Response) => {
  const { name, password, bio } = req.body;
  let profileImage = null;

  if (req.file) profileImage = req.file.filename;

  const reqUser = req.user;
  const user = await User.findById(new Types.ObjectId(reqUser._id)).select(
    "-password"
  );

  if (name) user.name = name;

  if (password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
  }

  if (profileImage) user.profileImage = profileImage;

  if (bio) user.bio = bio;

  await user.save();

  res.status(200).json(user);
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ username: id }).select("-password");

    if (user !== null) res.status(200).json(user);
    else throw new Error("Usuário não encontrado.");
  } catch (error) {
    res.status(404).json({ errors: ["Usuário não encontrado."] });
  }
};

module.exports = { register, login, getCurrentUser, update, getUserById };
