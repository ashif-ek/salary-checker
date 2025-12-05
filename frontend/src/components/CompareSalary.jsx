export default function CompareSalary({ median, yourSalary }) {
  if (!yourSalary) return null;

  let status = "";
  if (yourSalary < median) status = "below";
  else if (yourSalary === median) status = "equal";
  else status = "above";

  return (
    <div className="mt-6 p-4 border rounded-lg dark:border-gray-600">
      <h3 className="text-lg font-semibold mb-2">Your Salary Analysis</h3>

      <p className="text-gray-700 dark:text-gray-300">
        Market Median: ₹{median}  
        <br />
        Your Salary: ₹{yourSalary}
      </p>

      <p
        className={`mt-3 font-bold ${
          status === "below"
            ? "text-red-500"
            : status === "above"
            ? "text-green-500"
            : "text-blue-500"
        }`}
      >
        {status === "below" && "You are below market average."}
        {status === "equal" && "You are exactly at market median."}
        {status === "above" && "You are above market average!"}
      </p>
    </div>
  );
}
