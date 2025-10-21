#ifndef WIFIMANAGER_H
#define WIFIMANAGER_H

#include <Arduino.h>
#include <WiFi.h>

extern const char* ssid;
extern const char* password;

void setupWiFi();
void checkWiFi();
String getWiFiStatus();

#endif
