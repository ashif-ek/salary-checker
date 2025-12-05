import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { convertSalary } from "../utils/salaryConvert";

export default function SalaryChart({ data, yourSalary, mode }) {
  const chartData = [
    { label: "P10", value: convertSalary(data.p10, mode) },
    { label: "P25", value: convertSalary(data.p25, mode) },
    { label: "P50", value: convertSalary(data.p50, mode) },
    { label: "P75", value: convertSalary(data.p75, mode) },
    { label: "P90", value: convertSalary(data.p90, mode) },
  ];

  const yourSalaryConverted = convertSalary(yourSalary, mode);

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} />
          <Legend />

          <Bar
            dataKey="value"
            name="Market Percentiles"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
          />

          {yourSalary && (
            <Bar
              dataKey={() => yourSalaryConverted}
              name="Your Salary"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
