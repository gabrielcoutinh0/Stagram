import { Schema, model, Types } from "mongoose";

interface IPhoto {
  image: string;
  title?: string;
  likes?: [];
  comments?: [];
  userId: Types.ObjectId;
}

const photoSchema = new Schema<IPhoto>(
  {
    image: { type: String, requerid: true },
    title: { type: String, requerid: false },
    likes: { type: String, requerid: false },
    comments: { type: String, requerid: false },
    userId: Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

const Photo = model<IPhoto>("Photo", photoSchema);
module.exports = Photo;
