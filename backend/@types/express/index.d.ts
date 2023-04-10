declare namespace Express {
  interface Request {
    user: {
      _id: string;
      name: string;
      username: string;
      email: string;
    };
  }
}
