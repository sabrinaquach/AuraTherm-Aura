import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Canvas, Circle, BlurMask, Path, Skia } from "@shopify/react-native-skia";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const clamp = (n, a, b) => Math.min(Math.max(n, a), b);
const angleToValue = (deg, min, max) => {
  const t = clamp((deg + 180) / 180, 0, 1);
  return min + t * (max - min);
};
const valueToSweep = (value, min, max) => {
  const p = clamp((Number(value) - min) / (max - min), 0, 1);
  return 180 * p; // degrees
};

export default function ThermostatDial({
  dialColor = "#A3C858C9",
  r = 320,     // glow
  s = 290,     // ring / track radius
  cx = 500,
  cy = 325,
  value = 70,  // raw device value (no conversions)
  min = 50,    // set to your unit range (F: 50–90; C: 10–30)
  max = 90,
  onChange,
  onChangeEnd,
  width = 600,
  height = 700,
}) {
  const [localValue, setLocalValue] = useState(value);
  useEffect(() => { setLocalValue(value); }, [value]);

  const strokeWidth = 12;
  const rect = useMemo(
    () => Skia.XYWHRect(cx - s, cy - s, s * 2, s * 2),
    [cx, cy, s]
  );

  const trackPath = useMemo(() => {
    const p = Skia.Path.Make();
    p.addArc(rect, 180, 180);   // bottom half
    return p;
  }, [rect]);

  const sweepDeg = valueToSweep(localValue, min, max);
  const fgPath = useMemo(() => {
    const p = Skia.Path.Make();
    p.addArc(rect, 180, sweepDeg);
    return p;
  }, [rect, sweepDeg]);

  const pan = Gesture.Pan()
    .onBegin((e) => {
      const deg = Math.atan2(e.y - cy, e.x - cx) * (180 / Math.PI);
      const next = Math.round(angleToValue(clamp(deg, -180, 0), min, max));
      setLocalValue(next);
      onChange?.(next);
    })
    .onUpdate((e) => {
      const deg = Math.atan2(e.y - cy, e.x - cx) * (180 / Math.PI);
      const next = Math.round(angleToValue(clamp(deg, -180, 0), min, max));
      setLocalValue(next);
      onChange?.(next);
    })
    .onEnd(() => onChangeEnd?.(localValue));

  return (
    <GestureDetector gesture={pan}>
      <View style={{ width, height }}>
        <Canvas style={{ flex: 1 }}>
          {/* glow */}
          <Circle cx={cx} cy={cy} r={r} color={dialColor}>
            <BlurMask blur={20} style="outer" />
          </Circle>
          {/* outer ring */}
          <Circle cx={cx} cy={cy} r={s} color={dialColor} style="stroke" strokeWidth={3} />
          {/* track */}
          <Path path={trackPath} color="#E6E6E6" style="stroke" strokeWidth={strokeWidth} strokeCap="round" />
          {/* progress */}
          <Path path={fgPath} color={dialColor} style="stroke" strokeWidth={strokeWidth} strokeCap="round" />
        </Canvas>
      </View>
    </GestureDetector>
  );
}
