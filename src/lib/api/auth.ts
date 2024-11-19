// src/lib/api/auth.ts

import axios from "axios";
import { LoginCredentials, AuthResponse, User } from "../../types/auth";
import { BASE_URL, createHeaders } from "./config";

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        `${BASE_URL}/user/sign-in`,
        credentials,
        { headers: createHeaders() }
      );
      return response.data; // Mengembalikan data response
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Authentication failed");
    }
  },

  async getUserInfo(token: string): Promise<User> {
    try {
      const response = await axios.get(`${BASE_URL}/user/info`, {
        headers: createHeaders(token),
      });

      const { response: userData } = response.data;

      return {
        id: userData.id,
        name: userData.name,
      };
    } catch (error) {
      console.error("Get user info error:", error);
      throw new Error("Failed to fetch user info");
    }
  },
};
