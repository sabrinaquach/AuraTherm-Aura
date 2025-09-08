#include "ThermostatAPI.h"
#include <ArduinoJson.h>

// Create server on port 80
WebServer server(80);

void handleStatus() {
    StaticJsonDocument<200> doc;
    doc["currentTemp"] = 72;  // placeholder
    doc["targetTemp"] = 74;   // placeholder
    doc["mode"] = "cooling";
    doc["motion"] = true;
    
    String output;
    serializeJson(doc, output);
    server.send(200, "application/json", output);
}

void setupAPI() {
    server.on("/status", HTTP_GET, handleStatus);
    server.begin();
    Serial.println("HTTP server started");
}