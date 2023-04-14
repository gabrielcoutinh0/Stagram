import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";

export interface IUser {
  _id: ObjectId;
  username: string;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  bio: string;
  photosPosted: [ObjectId];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, requerid: true },
    email: { type: String, requerid: true, unique: true, lowercase: true },
    password: { type: String, requerid: true },
    profileImage: { type: String, requerid: false },
    bio: { type: String, requerid: false },
    photosPosted: [{ type: ObjectId, ref: "Photo" }],
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
