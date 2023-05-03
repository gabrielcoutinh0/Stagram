import { IData, IPhoto } from "./type";

export const api = import.meta.env.VITE_SERVER_ENDPOINT;
export const uploads = import.meta.env.VITE_UPLOADS_SERVER;

export function requestConfig(
  method: string,
  data?: IData | IPhoto,
  token: string | null = null,
  image?: boolean
) {
  let config: RequestInit;

  config = {
    method,
    body: image ? (data as BodyInit) : JSON.stringify(data) || null,
    headers:
      token || method === "DELETE" || data === null
        ? { Authorization: `Bearer ${token}` }
        : { "Content-Type": "application/json" },
  };

  return config;
}
