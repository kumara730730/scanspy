import { useEffect, useState } from "react";

export function useScanStream(scanId) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!scanId) return;
    const stream = new EventSource(`/api/scan/${scanId}/stream`);
    stream.onmessage = (message) => {
      try {
        const payload = JSON.parse(message.data);
        setEvents((current) => [...current.slice(-250), payload]);
      } catch {
        // Ignore malformed events.
      }
    };
    stream.onerror = () => stream.close();
    return () => stream.close();
  }, [scanId]);

  return events;
}
