import express from "express";
import { cancelScan, getScan, startScan } from "../services/scanner.js";

const router = express.Router();

router.post("/start", async (req, res) => {
  const { targetUrl, wordlist = "medium" } = req.body || {};
  if (!targetUrl) {
    return res.status(400).json({ error: "targetUrl is required" });
  }

  try {
    const scanId = await startScan(targetUrl, wordlist);
    return res.json({ scanId });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/:scanId", (req, res) => {
  const scan = getScan(req.params.scanId);
  if (!scan) return res.status(404).json({ error: "Scan not found" });
  return res.json({
    status: scan.status,
    target: scan.target,
    startTime: scan.startTime,
    endTime: scan.endTime,
    requestsSent: scan.requestsSent,
    currentPath: scan.currentPath,
    totalPaths: scan.totalPaths,
    robotsDisallow: scan.robotsDisallow,
    results: scan.results,
    errors: scan.errors,
  });
});

router.get("/:scanId/stream", (req, res) => {
  const scan = getScan(req.params.scanId);
  if (!scan) return res.status(404).json({ error: "Scan not found" });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const send = (payload) => {
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  };

  send({ type: "ready", total: scan.totalPaths, requestsSent: scan.requestsSent });
  scan.results.slice(-20).forEach((result) => send({ type: "result", ...result }));

  const onResult = (result) => send({ type: "result", ...result });
  const onDone = () => {
    send({ type: "done" });
    res.end();
  };

  scan.emitter.on("result", onResult);
  scan.emitter.on("done", onDone);

  req.on("close", () => {
    scan.emitter.off("result", onResult);
    scan.emitter.off("done", onDone);
  });
});

router.post("/:scanId/cancel", (req, res) => {
  const ok = cancelScan(req.params.scanId);
  if (!ok) return res.status(404).json({ error: "Scan not found" });
  return res.json({ ok: true });
});

export default router;
