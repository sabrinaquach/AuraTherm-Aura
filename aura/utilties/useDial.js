import { useCallback, useMemo, useRef, useState } from "react";
import { Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import {
  clamp,
  angleForValue,
  valueForAngle,
  isPointOnRing,
  strokePosition,
} from "./dialMath";

// keep angles continuous relative to a reference
function normalizeToNear(t, ref) {
  'worklet';
  const TAU = Math.PI * 2;
  while (t - ref > Math.PI) t -= TAU;
  while (ref - t > Math.PI) t += TAU;
  return t;
}

export function useDial(cfg = {}) {
  const {
    value,
    defaultValue = 72,
    min = 60,
    max = 86,
    thetaMinDeg = -120,
    thetaMaxDeg = 120,
    cx = 0,
    cy = 0,
    r = 0,
    hitBand = 28,
    onChange,
    onChangeEnd,

    // feel
    smoothK = 0.22,
    minDragDistance = 8,
    flingBoost = 0.06,

    // mirroring
    mirrorX = true,           // visual flip is handled in component; we also mirror touch
    mirrorMode = "full",      // 'full' = match mirrored arc; 'visual' = old feel
  } = cfg;

  const [internal, setInternal] = useState(value ?? defaultValue);
  const liveValue = value ?? internal;

  const angle = useMemo(
    () => angleForValue(clamp(liveValue, min, max), min, max, thetaMinDeg, thetaMaxDeg),
    [liveValue, min, max, thetaMinDeg, thetaMaxDeg]
  );

  const notch = useMemo(
    () => strokePosition(cx, cy, r, angle * (180 / Math.PI)),
    [cx, cy, r, angle]
  );

  const jsSetValue = useCallback(
    (v, fire) => {
      if (value === undefined) setInternal(v);
      if (fire === "change" && onChange) onChange(v);
      if (fire === "end" && onChangeEnd) onChangeEnd(v);
    },
    [value, onChange, onChangeEnd]
  );

  const draggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const pan = useMemo(() => {
    let tPrev = angle;   // smoothed ref angle
    let angleOffset = 0; // prevents jump on grab

    const handle = (e, fire) => {
      "worklet";
      const { x, y } = e;
      const dx = x - cx;
      const dy = y - cy;

      if (!draggingRef.current) {
        if (!isPointOnRing(x, y, cx, cy, r, hitBand)) return;
        draggingRef.current = true;
        runOnJS(setIsDragging)(true);

        const tTouchRaw = Math.atan2(dy, dx);
        const tTouch = mirrorX ? Math.PI - tTouchRaw : tTouchRaw;

        const tCurrent = angleForValue(
          clamp(liveValue, min, max), min, max, thetaMinDeg, thetaMaxDeg
        );

        angleOffset = tCurrent - tTouch;
        tPrev = tCurrent;
      }

      const tTouchRaw = Math.atan2(dy, dx);
      const tTouch = mirrorX ? Math.PI - tTouchRaw : tTouchRaw;

      let t = tTouch + angleOffset;
      t = normalizeToNear(t, tPrev);

      let v = valueForAngle(t, min, max, thetaMinDeg, thetaMaxDeg);
      t = angleForValue(v, min, max, thetaMinDeg, thetaMaxDeg);

      const alpha = clamp(smoothK, 0, 1);
      const tSmooth = tPrev + alpha * (t - tPrev);
      tPrev = tSmooth;

      if (mirrorX && mirrorMode === "visual") {
        v = min + max - v;
      }

      runOnJS(jsSetValue)(v, fire);

      if (fire === "end") {
        const vx = e.velocityX ?? 0;
        const vy = e.velocityY ?? 0;
        const sint = Math.sin(tTouch);
        const cost = Math.cos(tTouch);
        const vAngular = ((vx * -sint) + (vy * cost)) / Math.max(r, 1); // rad/s
        const tFling = t + vAngular * flingBoost;
        let vFling = valueForAngle(tFling, min, max, thetaMinDeg, thetaMaxDeg);
        if (mirrorX && mirrorMode === "visual") vFling = min + max - vFling;
        runOnJS(jsSetValue)(vFling, "end");
      }
    };

    return Gesture.Pan()
      .minDistance(minDragDistance)
      .maxPointers(1)
      .averageTouches(true)
      .hitSlop(hitBand)
      .onBegin((e) => handle(e, "change"))
      .onUpdate((e) => handle(e, "change"))
      .onEnd((e) => {
        handle(e, "end");
        draggingRef.current = false;
        runOnJS(setIsDragging)(false);
      })
      .onFinalize(() => {
        draggingRef.current = false;
        runOnJS(setIsDragging)(false);
      });
  }, [
    cx, cy, r, hitBand,
    min, max, thetaMinDeg, thetaMaxDeg,
    liveValue, jsSetValue,
    smoothK, minDragDistance, flingBoost,
    mirrorX, mirrorMode, angle
  ]);

  const progress = useMemo(() => {
    return (clamp(liveValue, min, max) - min) / (max - min);
  }, [liveValue, min, max]);

  return { value: liveValue, angle, notch, progress, pan, isDragging };
}
