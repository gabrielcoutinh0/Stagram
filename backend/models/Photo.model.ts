import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

interface IPhoto {
  username: ObjectId;
  image: string;
  title: string;
  likes?: [ObjectId];
  comments?: [IComment];
}

interface IComment {
  _id: ObjectId;
  username: ObjectId;
  comment: string;
  createdAt: Date;
}

const photoSchema = new Schema<IPhoto>(
  {
    username: { type: ObjectId, ref: "User" },
    image: { type: String, requerid: true },
    title: String,
    likes: [ObjectId],
    comments: [
      {
        username: { type: ObjectId, ref: "User" },
        comment: String,
        createdAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Photo = model<IPhoto>("Photo", photoSchema);
