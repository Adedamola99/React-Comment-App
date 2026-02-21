import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { driverPerformanceData } from "../../data/mockData";

export default function PerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart
        data={driverPerformanceData}
        margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
        barSize={20}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,0.04)"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          tick={{ fill: "#64748b", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: "#64748b", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "#0f1a3d",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8,
            fontSize: 12,
          }}
          labelStyle={{ color: "#94a3b8" }}
        />
        <Bar
          dataKey="score"
          name="Score"
          fill="#3b82f6"
          radius={[4, 4, 0, 0]}
          opacity={0.9}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
