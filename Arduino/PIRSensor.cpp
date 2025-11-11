#include "PIRSensor.h"

PIRSensor::PIRSensor(uint32_t holdMs) : _holdMs(holdMs) {}

void PIRSensor::begin(uint8_t pin, bool usePulldown, uint32_t warmupMs) {
  _pin = pin;
  if (usePulldown) pinMode(_pin, INPUT_PULLDOWN);
  else             pinMode(_pin, INPUT);

  _warmupEndMs = millis() + warmupMs;

  // Use ESP32-specific attach with context pointer so ISR can touch 'this'
  attachInterruptArg(digitalPinToInterrupt(_pin), &_isrThunk, this, RISING);
}

void PIRSensor::update() {
  // ignore triggers during warm-up
  if ((int32_t)(millis() - _warmupEndMs) < 0) {
    _edge = false;
    _occupied = false;
    return;
  }

  if (_edge) {
    _edge = false;
    _lastMotionMs = millis();
    _occupied = true;   // become occupied immediately on motion
  }

  if (_occupied && (millis() - _lastMotionMs > _holdMs)) {
    _occupied = false;  // auto-vacate after hold time
  }
}

String PIRSensor::jsonKV(const char *key) const {
  // Produces:  "motion_detected":true/false
  String s = "\"";
  s += key;
  s += "\":";
  s += (_occupied ? "true" : "false");
  return s;
}

void IRAM_ATTR PIRSensor::_isrThunk(void *arg) {
  PIRSensor *self = reinterpret_cast<PIRSensor*>(arg);
  self->_edge = true;  // keep ISR fast; timestamping happens in update()
}
