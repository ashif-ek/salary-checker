export function convertSalary(value, mode) {
  if (!value || isNaN(value)) return 0;

  return mode === "monthly"
    ? Math.round(value / 12)
    : value;
}
