export interface IData {
  _id?: string;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  profileImage?: string | File;
  bio?: string;
  photosPosted?: [string];
  newPassword?: string;
  newPasswordConfirmation?: string;
}

export type themeType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

export interface IPhoto {
  _id?: string;
  username?: string;
  image?: File | null | undefined;
  title?: string;
  likes?: [];
  comments?: [];
}
