// src/types/response.ts
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}
