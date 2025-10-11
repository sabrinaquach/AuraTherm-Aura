// utilties/dialMath.js
export const RAD = Math.PI / 180;
export const DEG = 180 / Math.PI;

export function clamp(n, a, b) {
  'worklet';
  return Math.max(a, Math.min(b, n));
}

export function angleForValue(value, min, max, thetaMinDeg, thetaMaxDeg) {
  'worklet';
  const v = clamp(value, min, max);
  const tMin = thetaMinDeg * RAD;
  const span = (thetaMaxDeg - thetaMinDeg) * RAD;
  return tMin + ((v - min) / (max - min)) * span;
}

export function valueForAngle(theta, min, max, thetaMinDeg, thetaMaxDeg) {
  'worklet';
  const tMin = thetaMinDeg * RAD;
  const span = (thetaMaxDeg - thetaMinDeg) * RAD;
  const t = clamp(theta, tMin, tMin + span);
  return min + ((t - tMin) / span) * (max - min);
}

export function strokePosition(cx, cy, r, angleDeg) {
  const t = angleDeg * RAD;
  return { x: cx + r * Math.cos(t), y: cy + r * Math.sin(t) };
}

export function isPointOnRing(x, y, cx, cy, r, band) {
  'worklet';
  const d = Math.hypot(x - cx, y - cy);
  return d >= (r - band) && d <= (r + band);
}

export function progressFraction(angleRad, thetaMinDeg, thetaMaxDeg) {
  'worklet';
  const tMin = thetaMinDeg * RAD;
  const span = (thetaMaxDeg - thetaMinDeg) * RAD;
  return clamp((angleRad - tMin) / span, 0, 1);
}

export function snapValue(value, min, max, step) {
  'worklet';
  const ticks = Math.round((value - min) / step);
  return clamp(min + ticks * step, min, max);
}
