// src/types/auth.ts
export interface User {
  id: number;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: boolean;
  message: string;
  response: string;
}

export interface LoginResponse {
  data: {
    token: string;
    user: User;
  };
  message: string;
  status: number;
}
