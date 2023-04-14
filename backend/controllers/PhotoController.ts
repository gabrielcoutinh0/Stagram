import { Request, Response } from "express";
import { Types } from "mongoose";
import { Photo } from "../models/Photo.model";
import { User } from "../models/User.model";

export const insertPhoto = async (req: Request, res: Response) => {
  const { title } = req.body;

  const image = req.file?.filename;
  const reqUser = req.user;
  const user = await User.findById(reqUser);

  try {
    const newPhoto = await Photo.create({
      username: user,
      image,
      title,
    });

    await User.findByIdAndUpdate(
      user,
      { $push: { photosPosted: newPhoto } },
      { new: true }
    );

    res.status(201).json(newPhoto);
  } catch (error) {
    res.status(422).json({
      errors: ["Houve um problema, por favor tente novamente mais tarde."],
    });
  }
};

export const deletePhoto = async (req: Request, res: Response) => {
  const { id } = req.params;

  const reqUser = req.user;
  const user = await User.findById(reqUser);
  const photo = await Photo.findById(new Types.ObjectId(id));

  if (!photo?.username.equals(new Types.ObjectId(user?._id))) {
    return res.status(200).json({
      errors: "Houve um problema, por favor tente novamente mais tarde.",
    });
  }

  try {
    await Photo.findByIdAndDelete(id);

    await User.findByIdAndUpdate(
      user,
      { $pull: { photosPosted: id } },
      { new: true }
    );
    res.status(200).json({ docs: "Foto excluída com sucesso." });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
  }
};

export const getAllPhotos = async (req: Request, res: Response) => {
  try {
    const photos = await Photo.find({})
      .sort([["createdAt", -1]])
      .exec();

    res.status(200).json(photos);
  } catch (error) {
    res.status(200).json({
      errors: "Houve um problema, por favor tente novamente mais tarde.",
    });
  }
};

export const getUserPhotos = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const photos = await User.find({ username: id })
      .select("photosPosted")
      .sort([["createdAt", -1]])
      .exec();

    return res.status(200).json(photos);
  } catch (error) {
    res.status(200).json({
      errors: "Houve um problema, por favor tente novamente mais tarde.",
    });
  }
};

export const getPhotoById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const photo = await Photo.findById(new Types.ObjectId(id));
    return res.status(200).json(photo);
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
  }
};

export const updatePhoto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  const reqUser = req.user;
  const photo = await Photo.findById(id);

  if (reqUser !== undefined || reqUser !== null) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!photo?.username.equals(reqUser!._id))
      return res.status(200).json({
        errors: "Houve um problema, por favor tente novamente mais tarde.",
      });
  }

  try {
    if (photo !== null) {
      if (title) photo.title = title;
      await photo?.save();
    }
    res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
  }
};

export const likePhoto = async (req: Request, res: Response) => {
  const { id } = req.params;
  let like: boolean;
  const reqUser = req.user;
  const photo = await Photo.findById(id);
  const ArrayLikes = photo?.likes;

  try {
    if (ArrayLikes?.includes(new Types.ObjectId(reqUser?._id))) {
      await Photo.findByIdAndUpdate(
        photo,
        { $pull: { likes: reqUser?._id } },
        { new: true }
      );
      like = false;
    } else {
      await Photo.findByIdAndUpdate(
        photo,
        { $push: { likes: reqUser?._id } },
        { new: true }
      );
      like = true;
    }

    photo?.save();

    res.status(200).json({
      photoId: id,
      userId: reqUser?._id,
      message: `A foto foi ${like ? "curtida" : "discurtida"}.`,
    });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada"] });
  }
};

export const commentPhoto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { comment } = req.body;
  const reqUser = req.user;
  const user = await User.findById(reqUser);
  const photo = await Photo.findById(id);

  try {
    const userComment = {
      username: user,
      comment,
      createdAt: Date.now(),
    };

    await Photo.findByIdAndUpdate(
      photo,
      { $push: { comments: userComment } },
      { new: true }
    );

    await photo?.save();

    res.status(200).json({
      comment: userComment,
      message: "O comentário foi adicionado com sucesso!",
    });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { photoId } = req.params;
  const { commentId } = req.params;
  const reqUser = req.user;
  const user = await User.findById(reqUser);
  const photo = await Photo.findById(photoId);

  if (photo?.comments !== undefined)
    for (let i = 0; i < photo?.comments.length; i++)
      if (photo?.comments[i]?._id.equals(new Types.ObjectId(commentId)))
        if (!photo?.comments[i]?.username.equals(new Types.ObjectId(user?._id)))
          return res.status(200).json({
            errors: "Desculpa, você não pode deletar esse comentário.",
          });

  try {
    await Photo.findByIdAndUpdate(
      photo,
      { $pull: { comments: { _id: commentId } } },
      { safe: true }
    );

    await photo?.save();

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
