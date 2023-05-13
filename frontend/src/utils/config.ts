import { IData, IPhoto } from "./type";

export const api = import.meta.env.VITE_SERVER_ENDPOINT;
export const uploads = import.meta.env.VITE_UPLOADS_SERVER;

export function requestConfig(
  method: string,
  data?: IData | IPhoto | null,
  token: string | null = null,
  image?: boolean
) {
  let config: RequestInit;

  config = {
    method,
    body:
      data === null ? null : image ? (data as BodyInit) : JSON.stringify(data),
    headers:
      method === "PUT" && data && token && !image
        ? {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        : image || token
        ? { Authorization: `Bearer ${token}` }
        : { "Content-Type": "application/json" },
  };

  return config;
}
