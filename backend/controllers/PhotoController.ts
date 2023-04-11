import { Request, Response } from "express";
const Photo = require("../models/Photo");
const User = require("../models/User");

const insertPhoto = async (req: Request, res: Response) => {
  const { title } = req.body;
  const image = req.file?.filename;

  const reqUser = req.user;
  const user = await User.findById(reqUser._id);

  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    username: user.username,
  });

  if (!newPhoto) {
    res.status(422).json({
      errors: ["Houve um problema, por favor tente novamente mais tarde."],
    });
  }
  res.status(201).json(newPhoto);
};

module.exports = { insertPhoto };