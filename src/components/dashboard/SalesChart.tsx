// src/components/dashboard/SalesChart.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "flowbite-react";
import { SalesData } from "../../types/sales";

interface SalesChartProps {
  data: SalesData[];
}

export const SalesChart = ({ data }: SalesChartProps) => (
  <Card>
    <div className="p-4">
      <h5 className="text-xl font-bold mb-4">Product Sold</h5>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#2D9CDB"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </Card>
);
