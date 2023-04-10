declare namespace Express {
  interface Request {
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      password: string;
      profileImage?: string;
      bio?: string;
    };
  }
}
