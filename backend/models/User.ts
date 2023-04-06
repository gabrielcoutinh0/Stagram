import { Schema, model } from "mongoose";

interface IUser {
  name: string;
  userName: string;
  email: string;
  password: string;
  profileImage?: string;
  bio?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, requerid: true },
    userName: { type: String, requerid: true },
    email: { type: String, requerid: true },
    password: { type: String, requerid: true },
    profileImage: { type: String, requerid: false },
    bio: { type: String, requerid: false },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);
module.exports = User;
