#ifndef THERMOSTATAPI_H
#define THERMOSTATAPI_H

#include <Arduino.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <Wire.h>
#include <WebServer.h>

// Web server
extern WebServer server;

// Temperature sensor
extern Adafruit_BME280* bme;
extern float currentTemp;
extern int targetTemp;

// Functions
void setupAPI();
void handleStatus();
void handleSetTemp();
void updateCurrentTemp();
void temp_setup();

#endif
