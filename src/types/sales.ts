// src/types/sales.ts
export interface SalesData {
  date: string;
  amount: number;
  count: number;
  created_at: string;
  total: number;
  income: string;
}

export interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  total: number;
}
