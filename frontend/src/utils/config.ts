import { IRegister, ILogin } from "./type";

export const api = import.meta.env.VITE_SERVER_ENDPOINT;

export function requestConfig(
  method: string,
  data: IRegister | ILogin | string,
  token: string | null = null,
  image: string | null = null
) {
  let config: RequestInit;

  if (image) {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {},
    };
  } else if (method === "DELETE" || data === null) {
    config = {
      method,
      headers: {},
    };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  const authHeader = new Headers();

  if (token) {
    authHeader.append("Authorization", `Bearer ${token}`);
  }

  return config;
}
