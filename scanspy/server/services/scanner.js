import { EventEmitter } from "node:events";
import crypto from "node:crypto";
import { requestHead, requestText } from "../utils/httpClient.js";
import { sleep } from "../utils/rateLimiter.js";
import { classifyRisk } from "./riskClassifier.js";
import { getWordlist } from "./wordlist.js";

const scans = new Map();

function safeParseUrl(input) {
  try {
    const url = new URL(input);
    if (!/^https?:$/.test(url.protocol)) return null;
    return url;
  } catch {
    return null;
  }
}

async function parseRobots(baseUrl) {
  const robotsUrl = new URL("/robots.txt", baseUrl).toString();
  try {
    const text = await requestText(robotsUrl, 5000);
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => /^disallow:/i.test(line))
      .map((line) => line.split(":")[1]?.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function createScan(target, wordlistSize) {
  const scanId = crypto.randomUUID();
  const emitter = new EventEmitter();
  const scan = {
    scanId,
    target,
    wordlistSize,
    status: "running",
    startTime: new Date().toISOString(),
    endTime: null,
    requestsSent: 0,
    results: [],
    currentPath: "",
    totalPaths: 0,
    cancelled: false,
    errors: [],
    emitter,
    robotsDisallow: [],
  };
  scans.set(scanId, scan);
  return scan;
}

async function verifyTargetReachable(targetUrl) {
  try {
    await requestHead(targetUrl, 7000);
  } catch (error) {
    throw new Error(`Target unreachable: ${error.message}`);
  }
}

export async function startScan(targetUrl, wordlistSize = "medium") {
  const parsed = safeParseUrl(targetUrl);
  if (!parsed) throw new Error("Invalid target URL. Use http(s)://");

  await verifyTargetReachable(parsed.toString());
  const scan = createScan(parsed.toString(), wordlistSize);
  runScan(scan).catch((error) => {
    scan.status = "failed";
    scan.endTime = new Date().toISOString();
    scan.errors.push(error.message);
    scan.emitter.emit("done");
  });
  return scan.scanId;
}

async function runScan(scan) {
  const paths = getWordlist(scan.wordlistSize);
  scan.totalPaths = paths.length;
  scan.robotsDisallow = await parseRobots(scan.target);
  const batchSize = 10;

  for (let index = 0; index < paths.length; index += batchSize) {
    if (scan.cancelled) break;
    const batch = paths.slice(index, index + batchSize);

    await Promise.all(batch.map(async (path) => {
      if (scan.cancelled) return;

      const url = new URL(path, scan.target).toString();
      scan.currentPath = path;
      const startedAt = Date.now();

      try {
        const response = await requestHead(url);
        const size = Number(response.headers.get("content-length") || 0);
        const result = {
          path,
          url,
          statusCode: response.status,
          contentType: response.headers.get("content-type") || "unknown",
          size,
          riskLevel: classifyRisk(path, response.status),
          robotsDisallowed: scan.robotsDisallow.some((rule) => path.startsWith(rule)),
          responseTimeMs: Date.now() - startedAt,
          timestamp: new Date().toISOString(),
        };
        scan.results.push(result);
        scan.emitter.emit("result", result);
      } catch (error) {
        const result = {
          path,
          url,
          statusCode: 0,
          contentType: "unreachable",
          size: 0,
          riskLevel: "Info",
          robotsDisallowed: false,
          responseTimeMs: Date.now() - startedAt,
          timestamp: new Date().toISOString(),
          error: error.message,
        };
        scan.results.push(result);
        scan.emitter.emit("result", result);
      } finally {
        scan.requestsSent += 1;
      }
    }));

    await sleep(100);
  }

  scan.status = scan.cancelled ? "failed" : "completed";
  scan.endTime = new Date().toISOString();
  scan.emitter.emit("done");
}

export function getScan(scanId) {
  return scans.get(scanId);
}

export function cancelScan(scanId) {
  const scan = scans.get(scanId);
  if (!scan) return false;
  scan.cancelled = true;
  return true;
}
