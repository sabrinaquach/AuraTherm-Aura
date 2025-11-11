#include "WiFiManager.h"
#include <WiFi.h>

//Hotspot
const char* ssid     = "rager";
const char* password = "12345678";

bool wifiConnected = false;
unsigned long wifiStartTime = 0;
const unsigned long wifiTimeout = 30000; // 30 sec

void setupWiFi() {
    Serial.print("Connecting to Wi-Fi");
    WiFi.begin(ssid, password);
    wifiStartTime = millis();
    wifiConnected = false;
}

void checkWiFi() {
    if (wifiConnected) return;

    if (WiFi.status() == WL_CONNECTED) {
        wifiConnected = true;
        Serial.print("\nWi-Fi connected! IP: ");
        Serial.println(WiFi.localIP());
    } else if (millis() - wifiStartTime > wifiTimeout) {
        wifiConnected = false;
        Serial.println("\nFailed to connect to Wi-Fi");
    } else {
        static unsigned long lastDot = 0;
        if (millis() - lastDot >= 500) {
            Serial.print(".");
            lastDot = millis();
        }
    }
}

String getWiFiStatus() {
    if (WiFi.status() == WL_CONNECTED) {
        return WiFi.localIP().toString();
    } else {
        return "Not connected";
    }
}
