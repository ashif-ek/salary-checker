import { convertSalary } from "../utils/salaryConvert";

export default function SalaryInsightText({ median, yourSalary, mode }) {
  // If no median or no user salary, don't try to compute diff %
  if (!median || !yourSalary) {
    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Your Salary Insight</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enter your salary and ensure we have enough data for this role/city to
          see a detailed comparison.
        </p>
      </div>
    );
  }

  const m = convertSalary(median, mode);
  const y = convertSalary(yourSalary, mode);

  let diffText = "";

  if (m <= 0) {
    diffText =
      "We don't have enough reliable market data yet to compute a fair comparison.";
  } else {
    const diffPercent = (((y - m) / m) * 100).toFixed(1);
    diffText =
      y >= m
        ? `Your salary is above the market median. (+${diffPercent}%)`
        : `Your salary is below the market median. (${diffPercent}%)`;
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Your Salary Insight</h3>

      <p className="text-sm">
        Market Median ({mode === "annual" ? "Annual" : "Monthly"}):{" "}
        <strong>₹{m.toLocaleString()}</strong>
      </p>

      <p className="text-sm">
        Your Salary ({mode === "annual" ? "Annual" : "Monthly"}):{" "}
        <strong>₹{y.toLocaleString()}</strong>
      </p>

      <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
        {diffText}
      </p>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        The median salary represents the 50th percentile — half of professionals
        earn less, and half earn more. Being above the median indicates strong
        market standing; being below suggests negotiation opportunity or skill
        enhancement.
      </p>
    </div>
  );
}
