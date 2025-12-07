import { useCallback, useEffect, useState } from "react";

export default function useThermostatStatus() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [lastMotion, setLastMotion] = useState(null);
  const [motionHistory, setMotionHistory] = useState([]);

  const ESP_IP = "http://172.20.10.13";

  const logMotionEvent = (motion, snapshot) => {
    const event = {
      type: motion ? "motion_start" : "motion_end",
      time: new Date().toLocaleTimeString(),
      currentTemp: snapshot.currentTemp,
      targetTemp: snapshot.targetTemp,
      mode: snapshot.mode,   // <-- THIS is correct now
    };
    setMotionHistory(prev => [...prev, event]);
  };

  useEffect(() => {
    let mounted = true;

    async function fetchStatus() {
      try {
        const res = await fetch(`${ESP_IP}/status`);
        const json = await res.json();

        if (!mounted) return;

        // Update state FIRST
        setData(json);

        const currentMotion =
          json.motionDetected ??
          json.motion_detected ??
          false;

        // Detect edge
        if (lastMotion !== null && currentMotion !== lastMotion) {
          logMotionEvent(currentMotion, {
            currentTemp: json.currentTemp,
            targetTemp: json.targetTemp,

            // USE USER MODE, NOT HVAC STATE:
            mode: json.mode === "Idle" || json.mode === "Heat" || json.mode === "Cool"
              ? "Heating/Cooling"
              : json.mode,
          });
        }

        setLastMotion(currentMotion);

      } catch (e) {
        if (mounted) setError(e);
      } finally {
        setLoading(false);
      }
    }

    fetchStatus();
    const interval = setInterval(fetchStatus, 1000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [lastMotion]);

  // ---- rest unchanged ----
  const setTargetTempOnESP = useCallback(async (v) => {
    try {
      await fetch(`${ESP_IP}/set`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetTemp: v })
      });
      setData(prev => prev ? { ...prev, targetTemp: v } : { targetTemp: v });
    } catch (err) {
      console.warn("Failed to send temp to ESP:", err);
    }
  }, []);

  const setModeOnESP = useCallback(async (newMode) => {
    try {
      await fetch(`${ESP_IP}/set`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: newMode })
      });
      setData(prev => prev ? { ...prev, mode: newMode } : { mode: newMode });
    } catch (err) {
      console.warn("Failed to send mode to ESP:", err);
    }
  }, []);

  const setMotionOnESP = useCallback(async (value) => {
    try {
      await fetch(`${ESP_IP}/motion/set`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ motion: value })
      });
      setData(prev =>
        prev ? { ...prev, motionEnabled: value } : { motionEnabled: value }
      );
    } catch (err) {
      console.warn("Failed to send motion toggle:", err);
    }
  }, []);

  return {
    data,
    loading,
    error,
    setTargetTempOnESP,
    setModeOnESP,
    setMotionOnESP,
    motionHistory,
  };
}
