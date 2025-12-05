import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchInsights } from "./api/salaryApi";

import AutoSuggestInput from "./components/AutoSuggestInput";
import ShimmerCard from "./components/ShimmerCard";
import SalaryChart from "./components/SalaryChart";
import SalaryInsightText from "./components/SalaryInsightText";
import SalaryModeToggle from "./components/SalaryModeToggle";

import AdminPanel from "./components/AdminPanel";
import ThemeToggle from "./components/ThemeToggle";

import { JOB_ROLES, CITIES } from "./data/options";

function App() {
  const [form, setForm] = useState({
    job_role: "",
    city: "",
    experience: "",
    your_salary: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Annual / Monthly mode
  const [mode, setMode] = useState("annual");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.job_role || !form.city || !form.experience) {
      alert("Please fill job role, city, and experience.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await fetchInsights(
        form.job_role,
        form.city,
        form.experience
      );
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Could not fetch insights");
    } finally {
      setLoading(false);
    }
  };

  const yourSalaryNum =
    form.your_salary && !isNaN(form.your_salary)
      ? Number(form.your_salary)
      : null;

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Salary Reality Checker Dashboard
          </h1>
          <ThemeToggle />
        </div>

        {/* Input Card */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <div className="grid grid-cols-1 gap-4">
            <AutoSuggestInput
              label="Job Role"
              name="job_role"
              value={form.job_role}
              onChange={handleChange}
              suggestions={JOB_ROLES}
              placeholder="e.g. Software Engineer"
            />

            <AutoSuggestInput
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              suggestions={CITIES}
              placeholder="e.g. Bangalore"
            />

            <div>
              <label className="block text-sm font-medium mb-1">
                Experience (Years)
              </label>
              <input
                name="experience"
                type="number"
                value={form.experience}
                onChange={handleChange}
                className="w-full p-3 border rounded dark:bg-gray-800 dark:border-gray-700"
                placeholder="e.g. 2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Your Salary (optional)
              </label>
              <input
                name="your_salary"
                type="number"
                value={form.your_salary}
                onChange={handleChange}
                className="w-full p-3 border rounded dark:bg-gray-800 dark:border-gray-700"
                placeholder="e.g. 750000"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-3 rounded font-medium"
            >
              {loading ? "Analyzing..." : "Analyze Salary"}
            </button>
          </div>
        </motion.div>

        {/* Loading Shimmer */}
        {loading && <ShimmerCard />}

        {/* Insights Card (only when we have data) */}
        <AnimatePresence>
          {result && !loading && !result.no_data && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
            >
              {/* Annual / Monthly Toggle */}
              <SalaryModeToggle mode={mode} setMode={setMode} />

              {/* Salary Distribution Chart */}
              <SalaryChart
                data={result}
                yourSalary={yourSalaryNum}
                mode={mode}
              />

              {/* Insight Text */}
              <SalaryInsightText
                median={result.p50}
                yourSalary={yourSalaryNum}
                mode={mode}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* No-data message */}
        {result?.no_data && !loading && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-4">
            <h2 className="text-xl font-semibold mb-2">No Data Found</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              We don’t have enough salary data for:
            </p>
            <ul className="text-sm mt-2 ml-4 list-disc">
              <li>Job Role: {form.job_role}</li>
              <li>City: {form.city}</li>
              <li>Experience: {form.experience} years</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Try another role/city/experience, or upload more records using the
              Admin Dataset Upload section below.
            </p>
          </div>
        )}

        {/* Admin Dataset Upload */}
        <AdminPanel />
      </motion.div>
    </div>
  );
}

export default App;
