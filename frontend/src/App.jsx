import { useState } from "react";
import { fetchInsights } from "./api/salaryApi";
import PercentileChart from "./components/PercentileChart";
import CompareSalary from "./components/CompareSalary";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [form, setForm] = useState({
    job_role: "",
    city: "",
    experience: "",
    your_salary: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await fetchInsights(
        form.job_role,
        form.city,
        form.experience
      );
      setResult(data);
    } catch (e) {
      console.error(e, "coudnt fetch insights");
      
      alert("Could not fetch insights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition">
      <div className="max-w-3xl mx-auto">
        
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-6">
            Salary Reality Checker Dashboard
          </h1>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 gap-5">
          <input
            name="job_role"
            placeholder="Job Role"
            className="p-3 border rounded dark:bg-gray-800 dark:border-gray-700"
            onChange={handleChange}
          />
          <input
            name="city"
            placeholder="City"
            className="p-3 border rounded dark:bg-gray-800 dark:border-gray-700"
            onChange={handleChange}
          />
          <input
            name="experience"
            placeholder="Experience Years"
            type="number"
            className="p-3 border rounded dark:bg-gray-800 dark:border-gray-700"
            onChange={handleChange}
          />
          <input
            name="your_salary"
            placeholder="Your Salary (optional)"
            type="number"
            className="p-3 border rounded dark:bg-gray-800 dark:border-gray-700"
            onChange={handleChange}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
          >
            {loading ? "Analyzing..." : "Analyze Salary"}
          </button>
        </div>

        {result && (
          <>
            <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Market Percentiles</h2>
              <PercentileChart data={result} />
            </div>

            <CompareSalary
              median={result.p50}
              yourSalary={Number(form.your_salary)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
