export default function SalaryModeToggle({ mode, setMode }) {
  return (
    <div className="flex gap-4 items-center my-3">
      <span className="text-sm font-medium">View Salary As:</span>
      <button
        className={`px-3 py-1 rounded ${
          mode === "annual"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 dark:bg-gray-700"
        }`}
        onClick={() => setMode("annual")}
      >
        Annual
      </button>

      <button
        className={`px-3 py-1 rounded ${
          mode === "monthly"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 dark:bg-gray-700"
        }`}
        onClick={() => setMode("monthly")}
      >
        Monthly
      </button>
    </div>
  );
}
