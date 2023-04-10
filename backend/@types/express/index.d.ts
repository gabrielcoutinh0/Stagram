declare namespace Express {
  interface Request {
    user: {
      name: string;
      username: string;
      email: string;
    };
  }
}
