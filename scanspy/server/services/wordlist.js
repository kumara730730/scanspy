const CORE_PATHS = [
  "/admin", "/login", "/api", "/backup", "/.env", "/config", "/uploads", "/wp-admin", "/phpinfo.php",
  "/.git", "/dashboard", "/robots.txt", "/sitemap.xml", "/db.sql", "/database.sql", "/dump.sql",
  "/.htaccess", "/.svn", "/server-status", "/cpanel", "/webmail", "/test", "/dev", "/staging",
  "/old", "/private", "/internal", "/secret", "/auth", "/oauth", "/signin", "/signup", "/register",
  "/graphql", "/swagger", "/openapi.json", "/docs", "/metrics", "/status", "/health", "/console",
  "/logs", "/log", "/backup.zip", "/archive.zip", "/config.php", "/config.json", "/settings.json",
  "/admin.php", "/user", "/users", "/account", "/profile", "/payments", "/billing", "/checkout"
];

const PREFIXES = ["", "/v1", "/v2", "/v3", "/internal", "/public", "/app", "/portal"];
const SUFFIXES = ["", ".json", ".xml", ".bak", ".old", "/index.php", "/index.html"];

function buildExpanded() {
  const set = new Set(CORE_PATHS);
  for (const prefix of PREFIXES) {
    for (const base of CORE_PATHS) {
      const normalized = `${prefix}${base}`.replace(/\/+/g, "/");
      set.add(normalized);
      for (const suffix of SUFFIXES) {
        if (!suffix) continue;
        set.add(`${normalized}${suffix}`.replace(/\/+/g, "/"));
      }
    }
  }
  return [...set].filter((p) => p !== "/" && p.startsWith("/"));
}

const FULL_WORDLIST = buildExpanded();

export function getWordlist(size = "medium") {
  if (size === "small") return FULL_WORDLIST.slice(0, 220);
  if (size === "large") return FULL_WORDLIST.slice(0, 850);
  return FULL_WORDLIST.slice(0, 450);
}
