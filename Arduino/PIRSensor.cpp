#pragma once
#include <Arduino.h>

class PIRSensor {
public:
  void begin(uint8_t pin, bool usePulldown=true, uint32_t warmupMs=0);
  bool raw() const;

private:
  uint8_t _pin = 255;
  uint32_t _warmupEnd = 0;
};
