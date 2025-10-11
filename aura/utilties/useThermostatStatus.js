// utilties/useThermostatStatus.js
import { useCallback, useEffect, useState } from "react";

export default function useThermostatStatus() {
  const [data, setData] = useState(null);   // { targetTemp, currentTemp, mode }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await new Promise(r => setTimeout(r, 250)); // simulate
        if (!mounted) return;
        setData({ targetTemp: 70, currentTemp: 72, mode: "off" });
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const setTargetTempOnESP = useCallback(async (v) => {
    setData(prev => prev ? { ...prev, targetTemp: v } : { targetTemp: v, currentTemp: v, mode: "off" });
  }, []);

  return { data, loading, error, setTargetTempOnESP };
}
