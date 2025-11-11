#pragma once
#include <Arduino.h>

class PIRSensor {
public:
  // Constructor: holdMs = occupied hold time after last motion
  explicit PIRSensor(uint32_t holdMs = 60 * 1000UL);

  // Initialize pin + (optional) warmup
  void begin(uint8_t pin, bool usePulldown = true, uint32_t warmupMs = 30 * 1000UL);

  // Call often (e.g., each loop or on a 50–200 ms tick)
  void update();

  // State getters
  bool occupied() const { return _occupied; }
  bool motionEdge() { bool e = _edge; _edge = false; return e; } // rising edge latch
  uint32_t lastMotionMs() const { return _lastMotionMs; }

  // Config
  void setHoldMs(uint32_t ms) { _holdMs = ms; }

  // Convenience: JSON KV like  "motion_detected":true
  String jsonKV(const char *key = "motion_detected") const;

private:
  static void IRAM_ATTR _isrThunk(void *arg); // ISR bridge (ESP32 supports attachInterruptArg)

  volatile bool _edge = false;
  bool _occupied = false;

  uint8_t  _pin = 255;
  uint32_t _holdMs = 60 * 1000UL;
  uint32_t _lastMotionMs = 0;
  uint32_t _warmupEndMs = 0;
};
