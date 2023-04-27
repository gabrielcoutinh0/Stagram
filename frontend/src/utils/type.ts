export interface IRegister {
  name: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export type themeType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

export interface IData {
  username: string;
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  bio?: string;
}
