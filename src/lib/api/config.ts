// src/lib/api/config.ts
export const BASE_URL = "https://belaundry-api.sebaris.link/platform";

export const createHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers.token = token;
  return headers;
};
