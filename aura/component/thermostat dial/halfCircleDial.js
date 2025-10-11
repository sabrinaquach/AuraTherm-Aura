// component/thermostat dial/halfCircleDial.js
import React, { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import { Canvas, Path, Skia, /* BlurMask, */ Circle, Group } from "@shopify/react-native-skia";
import { useDial } from "../../utilties/useDial";

// always-valid hex with alpha
function withAlpha(hex, a) {
  const h = hex.replace('#','');
  const rgb = h.length === 8 ? h.slice(0,6) : h;
  const aa = Math.round(a * 255).toString(16).padStart(2,'0');
  return `#${rgb}${aa}`;
}

export default function ThermostatDial({
  value,
  min = 60,
  max = 86,
  onChange,
  onChangeEnd,
  thetaMinDeg = -120,
  thetaMaxDeg = 120,
  dialColor = "#A3C858FF",
  glowSigma = 28,
  trackWidth = 12,
  progressWidth = 18,
  handleRadius = 12,
  innerGap = 44,
  innerWidth = 4,
  width,
  height,
  xShiftR = 1.02,   // push center right by 1.02 * r
  yShiftR = 0.08,   // push center down by 0.08 * r
  mirrorX = true,   // mirrored visuals
  mirrorMode = "full", // 'full' matches mirrored arc; 'visual' keeps old feel
}) {
  const [box, setBox] = useState({ w: width ?? 0, h: height ?? 0 });
  const needMeasure = width === undefined || height === undefined;

  const onLayout = (e) => {
    if (!needMeasure) return;
    const { width: w, height: h } = e.nativeEvent.layout;
    setBox({ w, h });
  };

  // room for glow
  const bleed = useMemo(() => progressWidth / 2 + 3 * glowSigma, [progressWidth, glowSigma]);

  const { cx, cy, r } = useMemo(() => {
    const w = box.w || width || 0;
    const h = box.h || height || 0;
    if (!w || !h) return { cx: 0, cy: 0, r: 0 };
    const margin = Math.max(12, bleed + 4);
    const rr = Math.max(Math.min(w / 2 - margin, h / 2 - margin), 0);
    const cxShifted = w / 2 + rr * xShiftR;
    const cyShifted = h / 2 + rr * yShiftR;
    return { cx: cxShifted, cy: cyShifted, r: rr };
  }, [box.w, box.h, width, height, bleed, xShiftR, yShiftR]);

  const arc = useMemo(() => {
    const p = Skia.Path.Make();
    if (r <= 0) return p;
    const rect = Skia.XYWHRect(cx - r, cy - r, 2 * r, 2 * r);
    const start = thetaMinDeg;
    const sweep = thetaMaxDeg - thetaMinDeg;
    p.addArc(rect, start, sweep);
    return p;
  }, [cx, cy, r, thetaMinDeg, thetaMaxDeg]);

  const arcInner = useMemo(() => {
    const p = Skia.Path.Make();
    if (r <= 0 || innerGap <= 0) return p;
    const rr = Math.max(0, r - innerGap);
    const rect = Skia.XYWHRect(cx - rr, cy - rr, 2 * rr, 2 * rr);
    const start = thetaMinDeg;
    const sweep = thetaMaxDeg - thetaMinDeg;
    p.addArc(rect, start, sweep);
    return p;
  }, [cx, cy, r, innerGap, thetaMinDeg, thetaMaxDeg]);

  const dial = useDial({
    value,
    min,
    max,
    thetaMinDeg,
    thetaMaxDeg,
    cx,
    cy,
    r,
    hitBand: 28,
    onChange,
    onChangeEnd,
    smoothK: 0.2,
    minDragDistance: 8,
    flingBoost: 0.06,
    mirrorX,
    mirrorMode, // 'full' recommended for Shakuro-like behavior
  });

  const ready = r > 0 && (width || box.w) && (height || box.h);
  const trackColor = withAlpha(dialColor, 0.13);
  const progressColor = dialColor;

  return (
    <View onLayout={onLayout} style={[styles.root, width && height ? { width, height } : undefined]}>
      {ready && (
        <GestureDetector gesture={dial.pan}>
          <Canvas style={StyleSheet.absoluteFill}>
            {/* flip drawing around dial center */}
            <Group transform={[{ translateX: cx }, { scaleX: mirrorX ? -1 : 1 }, { translateX: -cx }]}>

              {/* Track */}
              <Path path={arc} style="stroke" color={trackColor} strokeWidth={trackWidth} strokeCap="round" />

              {/* Glowing progress (optional) */}
              <Group>
                <Path
                  path={arc}
                  style="stroke"
                  color={progressColor}
                  strokeWidth={progressWidth}
                  strokeCap="round"
                  start={0}
                  end={dial.progress}
                >
                </Path>
              </Group>

              {/* Crisp progress */}
              <Path
                path={arc}
                style="stroke"
                color={progressColor}
                strokeWidth={progressWidth}
                strokeCap="round"
                start={0}
                end={dial.progress}
              />

              {/* Inner thin ring */}
              {innerGap > 0 && (
                <Path path={arcInner} style="stroke" color={withAlpha(dialColor, 0.55)} strokeWidth={innerWidth} strokeCap="round" />
              )}

              {/* Handle */}
              <Circle cx={dial.notch.x} cy={dial.notch.y} r={handleRadius} color={progressColor} />
              <Circle cx={dial.notch.x} cy={dial.notch.y} r={Math.max(1, handleRadius - 4)} color="#FFFFFFAA" />

            </Group>
          </Canvas>
        </GestureDetector>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: "100%", aspectRatio: 1 },
});
