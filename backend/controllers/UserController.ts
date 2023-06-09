import { Request, Response } from "express";
import { Types } from "mongoose";
import { User } from "../models/User.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const jwtSecret = `${process.env.JWT_SECRET}`;

const generateToken = (id: string) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "7d" });
};

export const register = async (req: Request, res: Response) => {
  const { name, username, email, password } = req.body;

  const userMail = await User.findOne({ email });
  const userName = await User.findOne({ username });

  if (userMail) {
    res
      .status(400)
      .json({ errors: ["Usuário já cadastrado com esse e-mail."] });
    return;
  } else if (userName) {
    res
      .status(422)
      .json({ errors: ["Usuário já cadastrado com esse username."] });
    return;
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    username,
    password: passwordHash,
  });

  if (!newUser) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
  }

  res.status(200).json({
    _id: newUser._id,
    token: generateToken(newUser._id.toString()),
  });
};

export const login = async (req: Request, res: Response) => {
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
    token: generateToken(user._id.toString()),
    username: user.username,
    profileImage: user.profileImage,
  });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = req.user;
  res.status(200).json(user);
};

export const update = async (req: Request, res: Response) => {
  const { name, bio, password, newPassword } = req.body;
  let profileImage = null;

  if (req.file) profileImage = req.file.filename;

  const reqUser = req.user;
  const user = await User.findById(new Types.ObjectId(reqUser?._id)).select(
    "-password"
  );
  const userPassword = await User.findById(
    new Types.ObjectId(reqUser?._id)
  ).select("password");

  try {
    if (userPassword && user !== null) {
      if (password && newPassword) {
        const validPassword = await bcrypt.compare(
          password,
          userPassword.password
        );
        if (validPassword) {
          const salt = await bcrypt.genSalt();
          const passwordHash = await bcrypt.hash(newPassword, salt);
          userPassword.password = passwordHash;
          await userPassword.save();
          res.status(200).json({ success: ["Senha alterada com sucesso!"] });
        } else {
          return res.status(422).json({ errors: ["Senha inválida."] });
        }
      } else {
        if (name) user.name = name;
        if (profileImage) user.profileImage = profileImage;
        if (bio) user.bio = bio;
        await user.save();

        res.status(200).json(user);
      }
    }
  } catch (error) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
  }
};

export const getUserByUsername = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ username: id }).select("-password");

    if (user !== null) res.status(200).json(user);
    else throw new Error("Usuário não encontrado.");
  } catch (error) {
    res.status(404).json({ errors: ["Usuário não encontrado."] });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id }).select("-password");

    if (user !== null) res.status(200).json(user);
    else throw new Error("ID não encontrado.");
  } catch (error) {
    res.status(404).json({ errors: ["ID não encontrado."] });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find({})
      .sort([["createdAt", -1]])
      .exec();

    res.status(200).json(users);
  } catch (error) {
    res.status(200).json({
      errors: "Houve um problema, por favor tente novamente mais tarde.",
    });
  }
};
