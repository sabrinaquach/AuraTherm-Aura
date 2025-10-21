#include "ThermostatAPI.h"
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <ArduinoJson.h>   

// Web server instance
WebServer server(80);

// BME280 instance
Adafruit_BME280* bme = nullptr;
#define BME_ADDRESS 0x76

// Temperature variables
float currentTemp = 0;    
int targetTemp = 74;      // default target

// Initialize BME280
void temp_setup() {
    Serial.println("Initializing BME280...");
    Wire.begin(21, 22, 100000); // SDA, SCL
    Wire.setClock(100000); // 100 kHz
    delay(100); // give time for sensor to power up

    bme = new Adafruit_BME280();

    if (!bme->begin(BME_ADDRESS)) {
        Serial.println("BME280 not detected! Check wiring.");
    } else {
        Serial.print("Detected sensor ID: 0x");
        Serial.println(bme->sensorID(), HEX);
        Serial.println("BME280 initialized successfully!");
    }
}

// Read sensor and convert to Fahrenheit
void updateCurrentTemp() {
    if (bme) {
        float tC = bme->readTemperature();
        if (!isnan(tC)) {
            currentTemp = (tC * 9.0 / 5.0) + 32.0;
        } else {
            Serial.println("Temperature read failed (NaN)");
        }
    }
}

// API handler for /status
void handleStatus() {
    updateCurrentTemp(); // always read before responding

    StaticJsonDocument<200> doc;
    doc["currentTemp"] = currentTemp;
    doc["targetTemp"] = targetTemp;
    //doc["currentTemp"] = 72; //static values to test if app can read
    //doc["targetTemp"] = 74;
    doc["mode"] = "cooling";
    doc["motion"] = true;

    String output;
    serializeJson(doc, output);
    server.send(200, "application/json", output);
}

// Setup server
void setupAPI() {
    server.on("/status", HTTP_GET, handleStatus);
    server.begin();
    Serial.println("HTTP server started");
}











//pseudo code for dynamic vars
//update app -> update hardware
// #include "ThermostatAPI.h"
// #include <ArduinoJson.h>
// #include <WebServer.h>

// WebServer server(80); // already declared globally in ThermostatAPI.h

// int currentTemp = 72;
// int targetTemp = 74;

// void handleStatus() {
//     StaticJsonDocument<200> doc;
//     doc["currentTemp"] = currentTemp;
//     doc["targetTemp"] = targetTemp;
//     doc["mode"] = "cooling";
    
//     String output;
//     serializeJson(doc, output);
//     server.send(200, "application/json", output);
// }

// void handleSetTemp() {
//     if (server.hasArg("plain") == false) {
//         server.send(400, "text/plain", "Body not received");
//         return;
//     }
//     StaticJsonDocument<200> doc;
//     DeserializationError error = deserializeJson(doc, server.arg("plain"));
//     if (error) {
//         server.send(400, "text/plain", "JSON parse error");
//         return;
//     }
//     targetTemp = doc["targetTemp"];  // update global variable
//     server.send(200, "application/json", "{\"status\":\"ok\"}");
// }

// void setupAPI() {
//     server.on("/status", HTTP_GET, handleStatus);
//     server.on("/set-temp", HTTP_POST, handleSetTemp);
//     server.begin();
//     Serial.println("HTTP server started");
// }
