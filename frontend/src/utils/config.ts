import { IRegister, ILogin } from "./type";

export const api = import.meta.env.VITE_SERVER_ENDPOINT;
export const uploads = import.meta.env.VITE_UPLOADS_SERVER;

export function requestConfig(
  method: string,
  data: IRegister | ILogin | string,
  token: string | null = null,
  image: boolean | null = null
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
      headers: { "Content-Type": "application/json" },
    };
  }

  if (token) {
    config = {
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  return config;
}
