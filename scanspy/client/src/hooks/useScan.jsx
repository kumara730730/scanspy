import { useEffect, useState } from "react";
import { getScan } from "../api";

export function useScan(scanId, intervalMs = 1200) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!scanId) return;
    let active = true;

    const tick = async () => {
      try {
        const next = await getScan(scanId);
        if (active) {
          setData(next);
          setError("");
        }
      } catch (err) {
        if (active) setError(err.message);
      }
    };

    tick();
    const timer = setInterval(tick, intervalMs);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [scanId, intervalMs]);

  return { data, error };
}
