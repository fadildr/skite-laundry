// src/pages/dashboard/Dashboard.tsx
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Alert } from "flowbite-react";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { productsApi } from "../../lib/api/products";
import { salesApi } from "../../lib/api/sales";
interface SalesData {
  created_at: string;
  total: number;
  income: string;
}

export default function Dashboard() {
  const { token, user } = useAuth();
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [products, setProducts] = useState<any[]>([]);

  const fetchSalesData = async () => {
    if (!token) return;

    try {
      const response = await salesApi.getReport();

      setSalesData(response);
    } catch (error: any) {
      console.error("Error fetching sales:", error);
      setAlertMessage(
        "Error fetching sales data: " + (error?.message || error)
      );
      setAlertVisible(true);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchProducts = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const data = await productsApi.getProducts();

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("Invalid products data:", data);
        setProducts([]);
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch products";
      setError(errorMessage);
      setProducts([]);
      setAlertMessage("Error fetching products: " + errorMessage);
      setAlertVisible(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchSalesData();
    fetchProducts();
  }, [token]);

  // Get top 3 products by price
  const topProducts = products
    .sort((a, b) => b.price - a.price)
    .slice(0, 3)
    .map((product) => ({
      name: product.name,
      value: product.price,
    }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 p-6 bg-white">
        <h1 className="text-xl font-semibold">Home</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">
                <FiUser />
              </span>
            </div>
            <span>{user?.name || "John Doe"}</span>
          </div>
        </div>
      </div>

      {/* Product Sold Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-medium">Product Sold</h2>
          <select className="bg-transparent border rounded px-2 py-1 text-sm">
            <option>This week</option>
            <option>This month</option>
            <option>This year</option>
          </select>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <XAxis
                dataKey="created_at"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748B" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748B" }}
              />
              <Tooltip />
              <Bar dataKey="total" fill="#2D9CDB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white p-6 rounded-lg shadow-sm w-1/2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-medium">Top selling product</h2>
          <select className="bg-transparent border rounded px-2 py-1 text-sm">
            <option>This week</option>
            <option>This month</option>
            <option>This year</option>
          </select>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-sm text-gray-600">
              <th className="text-left font-medium py-2">Name</th>
              <th className="text-right font-medium py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product, index) => (
              <tr key={index} className="border-t">
                <td className="py-3">{product.name}</td>
                <td className="text-right py-3">
                  ${product.value.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {alertVisible && (
        <Alert color="failure" onDismiss={() => setAlertVisible(false)}>
          {alertMessage}
        </Alert>
      )}
    </div>
  );
}
