export default function PercentileScale({ data, yourSalary }) {
  const points = [
    { label: "P10", value: data.p10 },
    { label: "P25", value: data.p25 },
    { label: "P50 (Median)", value: data.p50 },
    { label: "P75", value: data.p75 },
    { label: "P90", value: data.p90 },
  ];

  const min = data.p10;
  const max = data.p90;

  const yourPos = yourSalary
    ? ((yourSalary - min) / (max - min)) * 100
    : null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Market Salary Distribution</h3>

      <div className="relative h-4 bg-gradient from-red-500 via-yellow-400 to-green-500 rounded-full shadow-inner"></div>

      {yourSalary && (
        <div
          className="absolute -mt-2 flex flex-col items-center"
          style={{ left: `${yourPos}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-black dark:border-b-white"></div>
          <span className="text-sm font-semibold mt-1">Your Salary</span>
        </div>
      )}

      <div className="flex justify-between mt-4 text-sm text-gray-700 dark:text-gray-300">
        {points.map((p) => (
          <div key={p.label} className="text-center">
            <p className="font-semibold">{p.label}</p>
            <p>₹{p.value?.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
