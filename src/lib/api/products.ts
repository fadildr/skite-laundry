import axios from "axios";
import { BASE_URL, createHeaders } from "./config";
import { Product } from "../../types/product";

interface ApiResponse<T> {
  status: boolean;
  message: string;
  response: T;
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem("token") || "";

export const productsApi = {
  async getProducts(): Promise<Product[]> {
    const { data } = await apiClient.get<ApiResponse<Product[]>>("/product", {
      headers: createHeaders(token),
    });

    if (!data.status || !Array.isArray(data.response)) {
      throw new Error(data.message || "Failed to fetch products");
    }

    return data.response;
  },

  async getProductDetail(id: number): Promise<Product> {
    const { data } = await apiClient.get<ApiResponse<Product>>(
      `/product/${id}`,
      {
        headers: createHeaders(token),
      }
    );

    if (!data.status) {
      throw new Error(data.message || "Failed to fetch product");
    }

    return data.response;
  },
  async getCategories(): Promise<Product> {
    const { data } = await apiClient.get<ApiResponse<Product>>(
      `/product/categories`,
      {
        headers: createHeaders(token),
      }
    );

    if (!data.status) {
      throw new Error(data.message || "Failed to fetch product");
    }

    return data.response;
  },

  async create(payload: Omit<Product, "id">): Promise<Product> {
    const { data } = await apiClient.post<ApiResponse<Product>>(
      "/product",
      payload,
      {
        headers: createHeaders(token),
      }
    );

    if (!data.status) {
      throw new Error(data.message || "Failed to create product");
    }

    return data.response;
  },

  async update(id: number, payload: Partial<Product>): Promise<Product> {
    const { data } = await apiClient.put<ApiResponse<Product>>(
      `/product/${id}`,
      payload,
      {
        headers: createHeaders(token),
      }
    );

    if (!data.status) {
      throw new Error(data.message || "Failed to update product");
    }

    return data.response;
  },

  async delete(id: number): Promise<void> {
    const { data } = await apiClient.delete<ApiResponse<void>>(
      `/product/${id}`,
      {
        headers: createHeaders(token),
      }
    );

    if (!data.status) {
      throw new Error(data.message || "Failed to delete product");
    }
  },
};
