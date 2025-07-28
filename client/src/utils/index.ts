export function formatTimestamp(unixSeconds: string | null) {
  if (!unixSeconds) return "0";
  const unix = Number(unixSeconds);
  const date = new Date(unix * 1000);
  return date.toLocaleString("en-MY", {
    timeZoneName: "short",
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "short",
    day: "numeric",
  }); // Local timezone by default
}
