import { useEffect, useState } from "react";

export function useScanStream(scanId) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!scanId) return;

    const listener = (message) => {
      // Listen for the same SCAN_UPDATE but treat it as a stream of results
      if (message.type === 'SCAN_UPDATE' && message.scan.scanId === scanId) {
        const lastResult = message.scan.results[message.scan.results.length - 1];
        if (lastResult) {
          setEvents((current) => {
            // Only add if it's not already in the last few events to avoid duplicates
            const isDuplicate = current.some(e => e.path === lastResult.path && e.timestamp === lastResult.timestamp);
            if (isDuplicate) return current;
            return [...current.slice(-249), { type: 'result', ...lastResult }];
          });
        }
      }
    };

    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, [scanId]);

  return events;
}
