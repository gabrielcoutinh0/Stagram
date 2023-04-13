import { Schema, model } from "mongoose";

interface IPhoto {
  username: Schema.Types.ObjectId;
  image: string;
  title: string;
  likes?: [Schema.Types.ObjectId];
  comments?: [IComment];
}

interface IComment {
  username: Schema.Types.ObjectId;
  comment: string;
  createdAt: Date;
}

const photoSchema = new Schema<IPhoto>(
  {
    username: { type: Schema.Types.ObjectId, ref: "User" },
    image: { type: String, requerid: true },
    title: String,
    likes: [Schema.Types.ObjectId],
    comments: [
      {
        username: { type: Schema.Types.ObjectId, ref: "User" },
        comment: String,
        createdAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Photo = model<IPhoto>("Photo", photoSchema);

module.exports = Photo;
