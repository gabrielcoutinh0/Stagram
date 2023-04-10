import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
const path = require("path");

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const imageStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    let folder = "";

    if (req.baseUrl.includes("users")) folder = "users";
    else if (req.baseUrl.includes("photos")) folder = "photos";

    cb(null, `uploads/${folder}/`);
  },

  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    const type = path.extname(file.originalname);

    cb(null, `${new Date().getTime()}${type}`);
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    const type = path.extname(file.originalname);
    const acceptedTypes = [".jpg", ".png", ".jpeg"];

    if (!acceptedTypes.includes(`${type}`)) {
      cb(null, false);
      return cb(new Error("Por favor, envie apenas png, jpg ou jpeg!"));
    }

    cb(null, true);
  },
});

module.exports = { imageUpload };
