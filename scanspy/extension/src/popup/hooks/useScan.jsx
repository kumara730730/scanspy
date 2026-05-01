import { useEffect, useState } from "react";
import { getScan } from "../api";

export function useScan(scanId) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!scanId) return;

    // Initial fetch
    getScan(scanId)
      .then(setData)
      .catch(err => setError(err.message));

    // Listen for updates from background
    const listener = (message) => {
      if (message.type === 'SCAN_UPDATE' && message.scan.scanId === scanId) {
        setData(message.scan);
      }
    };

    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, [scanId]);

  return { data, error };
}
