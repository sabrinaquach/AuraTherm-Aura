#include "PIRSensor.h"

void PIRSensor::begin(uint8_t pin, bool usePulldown, uint32_t warmupMs) {
  _pin = pin;
  if (usePulldown) pinMode(_pin, INPUT_PULLDOWN);
  else             pinMode(_pin, INPUT);

  _warmupEnd = millis() + warmupMs;
}

bool PIRSensor::raw() const {
  // ignore during warmup
  if ((int32_t)(millis() - _warmupEnd) < 0) return false;
  return digitalRead(_pin);
}

