// src/components/product/ProductCard.tsx
import { Card } from "flowbite-react";
import { Product } from "../../types/product";
import { formatCurrency } from "../../lib/utils/formatters";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => (
  <Card className="hover:shadow-lg transition-shadow" onClick={onClick}>
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-48 object-cover rounded-t-lg"
    />
    <div className="p-4">
      <h5 className="text-lg font-bold mb-2">{product.name}</h5>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {product.description}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">
          {formatCurrency(product.price)}
        </span>
        <span className="text-sm text-gray-500">Stock: {product.stock}</span>
      </div>
    </div>
  </Card>
);
