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
