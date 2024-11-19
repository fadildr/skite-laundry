// src/types/product.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  stock: number;
  category_id: number;
  price: number;
  image: string;
}
