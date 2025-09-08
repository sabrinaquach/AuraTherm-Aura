#include "WiFiManager.h"

//Home
// const char* ssid = "Luna South-5G";
// const char* password = "Luna5West225$";

//Campus
// const char* ssid = "SJSU_guest";
// const char* password = "";

// Hotspot
const char* ssid = "Grike";
const char* password = "ChickenWang1738";

void setupWiFi() {
    Serial.print("Connecting to Wi-Fi");
    WiFi.begin(ssid, password);

    unsigned long startAttemptTime = millis();
    // Try for max 10 seconds
    while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 10000) {
        delay(500);
        Serial.print(".");
    }

    if (WiFi.status() == WL_CONNECTED) {
        Serial.print("\nWi-Fi connected! IP: ");
        Serial.println(WiFi.localIP());
    } else {
        Serial.println("\nFailed to connect to Wi-Fi");
    }
}

String getWiFiStatus() {
    if (WiFi.status() == WL_CONNECTED) {
        return WiFi.localIP().toString();
    } else {
        return "Not connected";
    }
}
