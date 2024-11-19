import axios from "axios";
import { BASE_URL, createHeaders } from "./config";
import { SalesData, OrderItem } from "../../types/sales";

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

export const salesApi = {
  async getReport(): Promise<SalesData[]> {
    const response = await apiClient.get<ApiResponse<SalesData[]>>(
      "/product/report",
      {
        headers: createHeaders(token),
      }
    );

    if (!Array.isArray(response.data)) {
      throw new Error("Failed to fetch sales report");
    }

    return response.data;
  },

  async getOrders(): Promise<OrderItem[]> {
    const { data } = await apiClient.get<ApiResponse<OrderItem[]>>("/orders", {
      headers: createHeaders(token),
    });

    if (!data.status || !Array.isArray(data.response)) {
      throw new Error(data.message || "Failed to fetch orders");
    }

    return data.response;
  },

  async getOrderById(id: number): Promise<OrderItem> {
    const { data } = await apiClient.get<ApiResponse<OrderItem>>(
      `/orders/${id}`,
      {
        headers: createHeaders(token),
      }
    );

    if (!data.status) {
      throw new Error(data.message || "Failed to fetch order");
    }

    return data.response;
  },
};
