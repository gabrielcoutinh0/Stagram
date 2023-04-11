import { Schema, model, Types } from "mongoose";

interface IPhoto {
  userId: Schema.Types.ObjectId;
  image: string;
  title: string;
  likes?: [];
  comments?: [];
  username: string;
}

const photoSchema = new Schema<IPhoto>(
  {
    userId: Types.ObjectId,
    image: { type: String, requerid: true },
    title: { type: String, requerid: true },
    likes: [{ type: String, requerid: false }],
    comments: [
      {
        comment: { type: String },
        userName: { type: String },
        userImage: { type: String },
        userId: { type: Types.ObjectId },
      },
    ],
    username: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Photo = model<IPhoto>("Photo", photoSchema);
module.exports = Photo;
