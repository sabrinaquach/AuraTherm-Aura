#pragma once
#include <Arduino.h>
#include <WebServer.h>
#include <Adafruit_BME280.h>

// ===== Globals provided by ThermostatAPI.cpp =====
extern WebServer server;
extern Adafruit_BME280 bme;
extern bool bmeInitialized;

extern float targetTempF;
extern String hvacMode;

// ===== Setup / API =====
void temp_setup();   // init BME280 (I2C on SDA=21, SCL=22)
void setupAPI();     // register HTTP routes (/status, /i2c-scan)

// ===== Snapshot for UI (OLED / dashboard callers) =====
// Returns latest readings. (°F, (target)°F, mode)
// Returns true if values are valid.
bool api_getSnapshot(float& tempF, float& targetF, String& mode);

