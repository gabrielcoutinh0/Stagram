import { IData } from "./type";

export const api = import.meta.env.VITE_SERVER_ENDPOINT;
export const uploads = import.meta.env.VITE_UPLOADS_SERVER;

export function requestConfig(
  method: string,
  data?: IData,
  token: string | null = null
) {
  let config: RequestInit;

  config = {
    method,
    body: method === "PUT" ? (data as BodyInit) : JSON.stringify(data) || null,
    headers:
      token || method === "DELETE" || data === null
        ? { Authorization: `Bearer ${token}` }
        : { "Content-Type": "application/json" },
  };

  return config;
}
