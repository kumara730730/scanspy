export function classifyClientRisk(path, statusCode) {
  const target = path.toLowerCase();
  if ([".env", ".git", "backup", "config", "db.sql"].some((x) => target.includes(x))) return "High";
  if (["/admin", "/login", "/api", "/dashboard"].some((x) => target.includes(x))) return "Medium";
  if ([301, 302, 307, 308].includes(statusCode)) return "Info";
  return "Low";
}
