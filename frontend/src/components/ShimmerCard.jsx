export default function ShimmerCard() {
  return (
    <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow animate-pulse">
      <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
    </div>
  );
}
