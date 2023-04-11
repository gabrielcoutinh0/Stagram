import { Request, Response } from "express";
import { Types } from "mongoose";
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
    return;
  }
  res.status(201).json(newPhoto);
};

const deletePhoto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    const photo = await Photo.findById(new Types.ObjectId(id));

    if (!photo.userId.equals(reqUser._id))
      throw new Error("Ocorreu um erro, por favor tente novamente mais tarde.");

    await Photo.findByIdAndDelete(photo._id);

    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluída com sucesso." });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }
};

const getAllPhotos = async (req: Request, res: Response) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

module.exports = { insertPhoto, deletePhoto, getAllPhotos };
