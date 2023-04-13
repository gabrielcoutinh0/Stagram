import { Request, Response } from "express";
import { Types } from "mongoose";
const Photo = require("../models/Photo");
const User = require("../models/User");

const insertPhoto = async (req: Request, res: Response) => {
  const { title } = req.body;
  const image = req.file?.filename;

  try {
    const reqUser = req.user;
    const user = await User.findById(reqUser._id);

    const newPhoto = await Photo.create({
      image,
      title,
      userId: user._id,
      username: user.username,
    });

    res.status(201).json(newPhoto);
  } catch (error) {
    res.status(422).json({
      errors: ["Houve um problema, por favor tente novamente mais tarde."],
    });
  }
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
  }
};

const getAllPhotos = async (req: Request, res: Response) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

const getUserPhotos = async (req: Request, res: Response) => {
  const { id } = req.params;

  const photos = await Photo.find({ username: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

const getPhotoById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const photo = await Photo.findById(new Types.ObjectId(id));
    return res.status(200).json(photo);
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
  }
};

const updatePhoto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const reqUser = req.user;
    const photo = await Photo.findById(id);

    if (!photo.userId.equals(reqUser._id))
      throw new Error("Ocorreu um erro, por favor tente novamente mais tarde.");

    if (title) photo.title = title;
    await photo.save();
    res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
  }
};

const likePhoto = async (req: Request, res: Response) => {
  const { id } = req.params;
  let like: boolean;
  try {
    const reqUser = req.user;
    const photo = await Photo.findById(id);
    const ArrayLikes = photo.likes;

    if (ArrayLikes.includes(reqUser._id)) {
      ArrayLikes.pull(reqUser._id);
      like = false;
    } else {
      ArrayLikes.push(reqUser._id);
      like = true;
    }

    photo.save();

    res.status(200).json({
      photoId: id,
      userId: reqUser._id,
      message: `A foto foi ${like ? "curtida" : "discurtida"}.`,
    });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada"] });
  }
};

const commentPhoto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const reqUser = req.user;
    const user = await User.findById(reqUser._id);
    const photo = await Photo.findById(id);

    const userComment = {
      comment,
      userName: user.username,
      userImage: user.profileImage,
      userId: user._id,
    };

    photo.comments.push(userComment);

    await photo.save();

    res.status(200).json({
      comment: userComment,
      message: "O comentário foi adicionado com sucesso!",
    });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  const { photoId } = req.params;
  const { commentId } = req.params;

  try {
    const reqUser = req.user;
    const user = await User.findById(reqUser);
    const photo = await Photo.findById(photoId);

    if (photo) {
      for (let i = 0; i < photo.comments.length; i++) {
        if (photo.comments[i].userId.equals(user._id)) {
          if (photo.comments[i]._id.equals(commentId)) {
            photo.comments.pull({ _id: commentId });
            await photo.save();
          }
        }
      }
    }

    res.status(200).json({
      comment: commentId,
      message: "O comentário foi removido com sucesso!",
    });
  } catch (error) {
    res.status(404).json({
      errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
    });
  }
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  deleteComment,
};
