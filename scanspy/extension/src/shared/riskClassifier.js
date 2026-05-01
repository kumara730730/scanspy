const HIGH_MARKERS = [".env", ".git", "backup", "config", "database", ".sql", ".bak", ".zip"];
const MEDIUM_MARKERS = ["/admin", "/login", "/api", "/dashboard", "/auth", "/manage"];

export function classifyRisk(path, statusCode) {
  const lowerPath = path.toLowerCase();

  if (HIGH_MARKERS.some((marker) => lowerPath.includes(marker))) {
    return "High";
  }
  if (MEDIUM_MARKERS.some((marker) => lowerPath.includes(marker))) {
    return "Medium";
  }
  if ([301, 302, 307, 308].includes(statusCode)) {
    return "Info";
  }
  if (statusCode >= 400) {
    return "Info";
  }
  return "Low";
}
