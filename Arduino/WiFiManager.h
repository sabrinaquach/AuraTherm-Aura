#ifndef WIFIMANAGER_H
#define WIFIMANAGER_H

#include <Arduino.h>  // needed for String, Serial, delay
#include <WiFi.h>     // needed for Wi-Fi functions

void setupWiFi();           // Connect to Wi-Fi
String getWiFiStatus();     // Optional: returns Wi-Fi status

#endif