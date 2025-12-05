import { useCallback, useEffect, useState } from "react";

export default function useThermostatStatus() {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ESP_IP = "http://172.20.10.13"; 

  //real-time polling, fetch every 1 second
  useEffect(() => {
    let mounted = true;

    async function fetchStatus() {
      try {
        const res = await fetch(`${ESP_IP}/status`);
        const json = await res.json();

        if (mounted) setData(json);
      } catch (e) {
        if (mounted) setError(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    //fetch immediately
    fetchStatus();

    //fetch every 1000 ms
    const interval = setInterval(fetchStatus, 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  //send temp to ESP
  const setTargetTempOnESP = useCallback(async (v) => {
    try {
      await fetch(`${ESP_IP}/set`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetTemp: v })
      });

      //update ui
      setData(prev => prev ? { ...prev, targetTemp: v } : { targetTemp: v });
    } catch (err) {
      console.warn("Failed to send temp to ESP:", err);
    }
  }, []);

  //send mode status to ESP
  const setModeOnESP = useCallback(async (newMode) => {
    try {
      await fetch(`${ESP_IP}/set`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: newMode })
      });
  
      // Update UI immediately
      setData(prev => prev ? { ...prev, mode: newMode } : { mode: newMode });
  
    } catch (err) {
      console.warn("Failed to send mode to ESP:", err);
    }
  }, []);
  
  //send motion status to ESP
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
  

  return { data, loading, error, setTargetTempOnESP, setModeOnESP, setMotionOnESP };
}
