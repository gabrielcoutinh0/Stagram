export interface IData {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  profileImage?: string | File;
  bio?: string;
}

export type themeType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};
