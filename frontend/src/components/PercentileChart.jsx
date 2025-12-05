import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function PercentileChart({ data }) {
  const chartData = [
    { label: "P10", value: data.p10 },
    { label: "P25", value: data.p25 },
    { label: "Median", value: data.p50 },
    { label: "P75", value: data.p75 },
    { label: "P90", value: data.p90 },
  ];

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
