import { useCallback, useEffect, useState } from "react";

export default function useThermostatStatus(currentRoomId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //history tracking
  const [history, setHistory] = useState([]);

  //track last motion state and temp state
  const [lastMotion, setLastMotion] = useState(null);
  const [lastTargetTemp, setLastTargetTemp] = useState(null);

  const ESP_IP = "http://172.20.10.02";   //http://172.20.10.02 or http://172.20.10.13

  //log history event
  const logHistoryEvent = (snapshot) => {
    const event = {
      room: currentRoomId,
      type: snapshot.type,
      time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      currentTemp: snapshot.currentTemp,
      targetTemp: snapshot.targetTemp,
      mode: snapshot.mode,
    };

    setHistory((prev) => [event, ...prev]);
  };

  //polling 
  useEffect(() => {
    let mounted = true;

    async function fetchStatus() {
      try {
        const res = await fetch(`${ESP_IP}/status`);
        const json = await res.json();
        console.log("STATUS JSON:", json);

        if (!mounted) return;

        setData(json);

        //current motion state from ESP
        const currentMotion =
          json.motionDetected ??
          json.motion_detected ??
          false;

        //motion start/end
        if (lastMotion !== null && currentMotion !== lastMotion) {
          logHistoryEvent({
            type: currentMotion ? "motion_start" : "motion_end",
            currentTemp: json.currentTemp,
            targetTemp: json.targetTemp,
            mode: json.mode,
          });
        }

        setLastMotion(currentMotion);

        //temp change
        if (lastTargetTemp !== null && json.targetTemp !== lastTargetTemp) {
          logHistoryEvent({
            type: currentMotion ? "temp_change" : "temp_change_no_motion",
            currentTemp: json.currentTemp,
            targetTemp: json.targetTemp,
            mode: json.mode,
          });
        }

        setLastTargetTemp(json.targetTemp);

      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchStatus();
    const interval = setInterval(fetchStatus, 1000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [lastMotion, lastTargetTemp]);

  //set temp
  const setTargetTempOnESP = useCallback(async (v) => {
    try {
      await fetch(`${ESP_IP}/set`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetTemp: v }),
      });
      setData((prev) => (prev ? { ...prev, targetTemp: v } : { targetTemp: v }));
    } catch (err) {
      console.warn("Failed to send temp:", err);
    }
  }, []);

  //set mode
  const setModeOnESP = useCallback(async (newMode) => {
    try {
      await fetch(`${ESP_IP}/set`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: newMode }),
      });
      setData((prev) => (prev ? { ...prev, mode: newMode } : { mode: newMode }));
    } catch (err) {
      console.warn("Failed to send mode:", err);
    }
  }, []);

  //toggle motion
  const setMotionOnESP = useCallback(async (value) => {
    try {
      await fetch(`${ESP_IP}/motion/set`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ motion: value }),
      });
      setData((prev) =>
        prev ? { ...prev, motionEnabled: value } : { motionEnabled: value }
      );
    } catch (err) {
      console.warn("Failed to send motion toggle:", err);
    }
  }, []);

  //room
  

  return {
    data,
    loading,
    error,
    setTargetTempOnESP,
    setModeOnESP,
    setMotionOnESP,
    history,
  };
}
