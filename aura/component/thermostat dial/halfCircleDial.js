import React, { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import { Canvas, Path, Skia, BlurMask, Circle, Group } from "@shopify/react-native-skia";
import { useDial } from "../../utilties/useDial";

// safe alpha helper
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

  // visuals
  glowSigma = 36,
  trackWidth = 12,
  progressWidth = 28,
  handleRadius = 12,
  innerGap = 56,
  innerWidth = 6,
  glowEnabled = true,
  showHandle = true,        // <- handle visible by default
  forceFullArc = false,

  // layout
  width,
  height,
  xShiftR = 1.18,
  yShiftR = 0.07,

  // gesture / feel
  mirrorX = true,
  mirrorMode = "full",
  mode = "infinite",
  infiniteBehavior = "wrap",
  pxPerFullSweep = 1400,
  smoothK = 0.12,
  flingBoost = 0.012,
  stepSnapOnEnd = 1,
  dragSign = -1,
}) {
  // measure if explicit size not provided
  const [box, setBox] = useState({ w: 0, h: 0 });
  const needMeasure = width === undefined || height === undefined;
  const onLayout = (e) => {
    if (!needMeasure) return;
    const { width: w, height: h } = e.nativeEvent.layout;
    setBox({ w, h });
  };

  // extra room for glow
  const bleed = useMemo(() => progressWidth / 2 + 3 * glowSigma, [progressWidth, glowSigma]);

  const { cx, cy, r } = useMemo(() => {
    const w = (width ?? box.w) || 0;
    const h = (height ?? box.h) || 0;
    if (!w || !h) return { cx: 0, cy: 0, r: 0 };
    const margin = Math.max(12, bleed + 4);
    const rr = Math.max(Math.min(w / 2 - margin, h / 2 - margin), 0);
    const cxShifted = w / 2 + rr * xShiftR;
    const cyShifted = h / 2 + rr * yShiftR;
    return { cx: cxShifted, cy: cyShifted, r: rr };
  }, [box.w, box.h, width, height, bleed, xShiftR, yShiftR]);

  // paths
  const arc = useMemo(() => {
    const p = Skia.Path.Make();
    if (r <= 0) return p;
    const rect = Skia.XYWHRect(cx - r, cy - r, 2 * r, 2 * r);
    p.addArc(rect, thetaMinDeg, thetaMaxDeg - thetaMinDeg);
    return p;
  }, [cx, cy, r, thetaMinDeg, thetaMaxDeg]);

  const arcInner = useMemo(() => {
    const p = Skia.Path.Make();
    if (r <= 0 || innerGap <= 0) return p;
    const rr = Math.max(0, r - innerGap);
    const rect = Skia.XYWHRect(cx - rr, cy - rr, 2 * rr, 2 * rr);
    p.addArc(rect, thetaMinDeg, thetaMaxDeg - thetaMinDeg);
    return p;
  }, [cx, cy, r, innerGap, thetaMinDeg, thetaMaxDeg]);

  // dial math & gesture
  const dial = useDial({
    value, min, max, thetaMinDeg, thetaMaxDeg, cx, cy, r,
    hitBand: 28,
    onChange, onChangeEnd,
    mirrorX, mirrorMode,
    mode, infiniteBehavior,
    pxPerFullSweep, smoothK, flingBoost, stepSnapOnEnd, dragSign,

    // ensure you can hit 50 & 90 while dragging and on release
    edgeSnapValue: 0.75,
  });

  const ready = r > 0 && ((width ?? box.w) && (height ?? box.h));
  const trackColor = withAlpha(dialColor, 0.13);
  const progressColor = dialColor;
  const endProgress = forceFullArc ? 1 : dial.progress;

  return (
    <View onLayout={onLayout} style={width && height ? { width, height } : styles.root}>
      {ready && (
        <GestureDetector gesture={forceFullArc ? undefined : dial.pan}>
          <Canvas style={StyleSheet.absoluteFill}>
            {/* flip drawing across the dial center */}
            <Group transform={[{ translateX: cx }, { scaleX: mirrorX ? -1 : 1 }, { translateX: -cx }]}>

              {/* faint outer track */}
              {trackWidth > 0 && (
                <Path path={arc} style="stroke" color={trackColor} strokeWidth={trackWidth} strokeCap="round" />
              )}

              {/* glowing progress */}
              <Path
                path={arc}
                style="stroke"
                color={progressColor}
                strokeWidth={progressWidth}
                strokeCap="round"
                start={0}
                end={endProgress}
              >
                {glowEnabled && <BlurMask blur={glowSigma} style="outer" />}
              </Path>

              {/* crisp progress */}
              <Path
                path={arc}
                style="stroke"
                color={progressColor}
                strokeWidth={progressWidth}
                strokeCap="round"
                start={0}
                end={endProgress}
              />

              {/* inner thin ring */}
              {innerGap > 0 && (
                <Path path={arcInner} style="stroke" color={withAlpha(dialColor, 0.55)} strokeWidth={innerWidth} strokeCap="round" />
              )}

              {/* HANDLE / KNOB at end of progress */}
              {showHandle && (
                <>
                  <Circle cx={dial.notch.x} cy={dial.notch.y} r={handleRadius} color={progressColor} />
                  <Circle cx={dial.notch.x} cy={dial.notch.y} r={Math.max(1, handleRadius - 4)} color="#FFFFFFAA" />
                </>
              )}
            </Group>
          </Canvas>
        </GestureDetector>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: "100%", aspectRatio: 1, overflow: 'visible' },
});
