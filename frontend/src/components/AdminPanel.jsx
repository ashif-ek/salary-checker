import { useState } from "react";
import { bulkUploadSalaries } from "../api/salaryApi";

export default function AdminPanel() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  const example = `Software Engineer,Bangalore,2,650000
Software Engineer,Bangalore,2,720000
Software Engineer,Bangalore,3,900000
Data Analyst,Bangalore,2,450000`;

  const handleUpload = async () => {
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const items = lines.map((line) => {
      const [role, city, exp, salary] = line.split(",");
      return {
        job_role: role.trim(),
        city: city.trim(),
        experience_years: Number(exp),
        salary_amount: Number(salary),
        source: "admin-upload",
      };
    });

    try {
      const res = await bulkUploadSalaries(items);
      setStatus(`Inserted ${res.inserted} rows.`);
    } catch (e) {
      console.error(e);
      setStatus("Upload failed.");
    }
  };

  return (
    <div className="mt-12 border rounded-lg p-5 bg-white dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-3">Admin – Dataset Upload</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        Paste CSV-like rows in the format:
        <br />
        <code>Job Role, City, Experience Years, Salary</code>
      </p>

      <button
        type="button"
        onClick={() => setText(example)}
        className="text-xs underline mb-2"
      >
        Fill example data
      </button>

      <textarea
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 border rounded dark:bg-gray-900 dark:border-gray-700 text-sm font-mono"
        placeholder="Software Engineer,Bangalore,2,650000"
      />

      <button
        onClick={handleUpload}
        className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm"
      >
        Upload Dataset
      </button>

      {status && (
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{status}</p>
      )}
    </div>
  );
}
