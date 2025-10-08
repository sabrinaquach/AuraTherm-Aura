// utilties/useDial.js
import { useEffect, useState, useCallback } from 'react';

export default function useDial() {
  const ESP32_IP = '172.20.10.5';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getThermostatStatus = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://${ESP32_IP}/status`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error('status fetch failed', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getThermostatStatus();
    // Optional polling:
    // const id = setInterval(getThermostatStatus, 5000);
    // return () => clearInterval(id);
  }, [getThermostatStatus]);

  // NEW: setter that updates ESP32
  const setTargetTempOnESP = useCallback(async (targetCelsius) => {
    try {
      // optimistic UI
      setData(prev => prev ? { ...prev, targetTemp: targetCelsius } : prev);

      const res = await fetch(`http://${ESP32_IP}/set-temp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetTemp: targetCelsius }),
      });

      if (!res.ok) {
        throw new Error(`ESP32 responded ${res.status}`);
      }

      // refresh to ensure device accepted it (optional)
      await getThermostatStatus();
    } catch (e) {
      console.error('set temp failed', e);
      // rollback if needed (simple: refetch)
      getThermostatStatus();
    }
  }, [getThermostatStatus]);

  return { data, loading, refresh: getThermostatStatus, setTargetTempOnESP };
}

// // utilties/useDial.js
// import { useEffect, useState, useCallback } from 'react';

// export default function useDial() {
//     const ESP32_IP = '172.20.10.5';
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError]   = useState(null);

//     const getThermostatStatus = useCallback(async () => {
//         try {
//         setLoading(true);
//         setError(null);
//         const res = await fetch(`http://${ESP32_IP}/status`);
//         const json = await res.json();
//         setData(json);
//         } catch (e) {
//         setError(e);
//         } finally {
//         setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         getThermostatStatus();
//         // Optional: poll every 5s
//         // const id = setInterval(getThermostatStatus, 5000);
//         // return () => clearInterval(id);
//     }, [getThermostatStatus]);

//     return { data, loading, error, refresh: getThermostatStatus };
// }

