import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express from "express";
import scanRoutes from "./routes/scan.js";

const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: ["http://localhost:5173"], credentials: false }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true, tool: "ScanSpy" }));
app.use("/api/scan", scanRoutes);

if (process.env.NODE_ENV === "production") {
  const staticPath = path.resolve(__dirname, "../client/dist");
  app.use(express.static(staticPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`ScanSpy server listening on http://localhost:${PORT}`);
});
