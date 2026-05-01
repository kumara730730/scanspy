import { classifyRisk } from '../shared/riskClassifier.js';
import { getWordlist } from '../shared/wordlist.js';

const scans = new Map();

async function requestHead(url, timeout = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      method: "HEAD",
      redirect: "manual",
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(id);
  }
}

async function requestText(url, timeout = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal,
    });
    return await response.text();
  } finally {
    clearTimeout(id);
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function parseRobots(baseUrl) {
  try {
    const robotsUrl = new URL("/robots.txt", baseUrl).toString();
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

export function createScan(target, wordlistSize) {
  // Use a more robust UUID generation or fallback
  const scanId = (typeof crypto !== 'undefined' && crypto.randomUUID) 
    ? crypto.randomUUID() 
    : Math.random().toString(36).substring(2) + Date.now().toString(36);
    
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
    robotsDisallow: [],
  };
  scans.set(scanId, scan);
  updateScanState(scan).catch(err => console.error('Initial state update failed:', err));
  return scanId;
}

async function updateScanState(scan) {
  try {
    await chrome.storage.local.set({ [scan.scanId]: scan });
    // Use try-catch for sendMessage as it throws if no one is listening
    try {
      await chrome.runtime.sendMessage({ type: 'SCAN_UPDATE', scan });
    } catch (e) {
      // Ignore "Could not establish connection" errors when popup is closed
    }
  } catch (err) {
    console.error('Failed to update scan state in storage:', err);
  }
}

export async function startScan(targetUrl, wordlistSize = "medium") {
  const trimmedUrl = (targetUrl || "").trim();
  console.log(`Starting scan for ${trimmedUrl} with size ${wordlistSize}`);
  
  // URL Validation
  let validatedUrl;
  try {
    if (!trimmedUrl) {
      throw new Error('Target URL is required');
    }
    validatedUrl = new URL(trimmedUrl);
    if (!validatedUrl.protocol.startsWith('http')) {
      throw new Error('Only http and https protocols are supported');
    }
  } catch (e) {
    throw new Error(`Invalid Target URL: ${e.message}. Please ensure the URL is valid and includes http:// or https:// (Current input: "${trimmedUrl}")`);
  }

  const scanId = createScan(validatedUrl.toString(), wordlistSize);
  const scan = scans.get(scanId);

  runScan(scan).catch((error) => {
    console.error('Scan failed with error:', error);
    scan.status = "failed";
    scan.endTime = new Date().toISOString();
    scan.errors.push(error.message);
    updateScanState(scan);
  });

  return scanId;
}

async function runScan(scan) {
  console.log(`runScan started for ${scan.scanId}`);
  const paths = getWordlist(scan.wordlistSize);
  scan.totalPaths = paths.length;
  
  try {
    scan.robotsDisallow = await parseRobots(scan.target);
  } catch (e) {
    console.warn('Robots.txt parsing failed:', e);
    scan.robotsDisallow = [];
  }
  
  const batchSize = 5;

  for (let index = 0; index < paths.length; index += batchSize) {
    if (scan.cancelled) {
      console.log('Scan cancelled at index', index);
      break;
    }
    const batch = paths.slice(index, index + batchSize);

    await Promise.all(batch.map(async (path) => {
      if (scan.cancelled) return;

      const url = new URL(path, scan.target).toString();
      scan.currentPath = path;
      const startedAt = Date.now();

      try {
        // Fallback to GET if HEAD is restricted or fails
        let response;
        try {
          response = await requestHead(url, 5000);
        } catch (headErr) {
          // If HEAD fails, try a GET but only for a small amount of data
          response = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(5000) });
        }

        const size = Number(response.headers.get("content-length") || 0);
        const duration = Date.now() - startedAt;

        if (response.status < 400 || response.status === 401 || response.status === 403) {
          scan.results.push({
            path,
            status: response.status,
            size,
            duration,
            risk: classifyRisk(path, response.status),
            timestamp: new Date().toISOString(),
          });
        }
      } catch (err) {
        // Individual request failure is logged but doesn't stop the scan
        console.debug(`Request to ${url} failed:`, err.message);
      } finally {
        scan.requestsSent++;
      }
    }));

    await updateScanState(scan);
    await sleep(200);
  }

  if (!scan.cancelled && scan.status !== 'failed') {
    console.log(`Scan ${scan.scanId} completed successfully`);
    scan.status = "completed";
    scan.endTime = new Date().toISOString();
    await updateScanState(scan);
  }
}

export function cancelScan(scanId) {
  const scan = scans.get(scanId);
  if (scan) {
    scan.cancelled = true;
    scan.status = "cancelled";
    scan.endTime = new Date().toISOString();
    updateScanState(scan);
  }
}

export function getScan(scanId) {
  return scans.get(scanId);
}
