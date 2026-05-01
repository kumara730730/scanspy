export async function startScan(payload) {
  const response = await fetch("/api/scan/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Scan start failed");
  return data;
}

export async function getScan(scanId) {
  const response = await fetch(`/api/scan/${scanId}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch scan");
  return data;
}

export async function cancelScan(scanId) {
  const response = await fetch(`/api/scan/${scanId}/cancel`, { method: "POST" });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to cancel scan");
  return data;
}
