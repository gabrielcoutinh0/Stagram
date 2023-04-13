import { Schema, model } from "mongoose";

interface IUser {
  username: string;
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  bio?: string;
  photosPosted?: [Schema.Types.ObjectId];
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, requerid: true },
    email: { type: String, requerid: true, unique: true, lowercase: true },
    password: { type: String, requerid: true },
    profileImage: { type: String, requerid: false },
    bio: { type: String, requerid: false },
    photosPosted: [{ type: Schema.Types.ObjectId, ref: "Photo" }],
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

module.exports = User;
