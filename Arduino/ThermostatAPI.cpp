#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_BME280.h>
#include <WebServer.h>

#include "ThermostatAPI.h"
#include "DisplayUI.h"   // use the screen module (implemented in DisplayUI.cpp)

// ===== Globals =====
WebServer server(80);
Adafruit_BME280 bme;
bool bmeInitialized = false;

// Example thermostat state (replace with your real state if you have it)
float  targetTempF = 72.0f;
String hvacMode    = "Cooling";  // "Heating" / "Cooling" / "Off"

// ===== Helpers =====
static inline float c_to_f(float c) { return c * 9.0f / 5.0f + 32.0f; }

// ===== Sensor setup =====
void temp_setup() {
  // ESP32 I2C pins
  Wire.begin(21, 22);
  Wire.setClock(100000);

  // Try both addresses
  if (bme.begin(0x76, &Wire) || bme.begin(0x77, &Wire)) {
    bmeInitialized = true;

    // Optional sampling config
    bme.setSampling(
      Adafruit_BME280::MODE_NORMAL,
      Adafruit_BME280::SAMPLING_X1,   // temp
      Adafruit_BME280::SAMPLING_X1,   // pressure
      Adafruit_BME280::SAMPLING_X1,   // humidity
      Adafruit_BME280::FILTER_OFF,
      Adafruit_BME280::STANDBY_MS_0_5
    );

    Serial.println(F("[BME280] Initialized"));
  } else {
    Serial.println(F("[BME280] NOT found on 0x76/0x77"));
  }
}

// ===== Tiny JSON helpers (no ArduinoJson needed) =====
static String jsonKV(const char* k, const String& v, bool last=false) {
  String s = "\""; s += k; s += "\":\""; s += v; s += "\"";
  if (!last) s += ",";
  return s;
}

static String jsonKV(const char* k, float v, bool last=false, uint8_t digits=1) {
  String s = "\""; 
  s += k; 
  s += "\":";
  // Force the correct String() overload: (double, unsigned int)
  s += String((double)v, (unsigned int)digits);
  if (!last) s += ",";
  return s;
}

// ===== /status handler =====
static void handleStatus() {
  float tempF, hum, p_hPa, alt_m, tgtF;
  String mode;

  bool ok = api_getSnapshot(tempF, hum, p_hPa, alt_m, tgtF, mode);

  String out = "{";
  if (ok) {
    out += jsonKV("currentTemp", tempF);
    out += jsonKV("humidity",    hum);
    out += jsonKV("pressure",    p_hPa, false, 1);
    out += jsonKV("altitude",    alt_m,  false, 1);
    out += jsonKV("targetTemp",  tgtF);
    out += jsonKV("mode",        mode,   true);
  } else {
    out += jsonKV("error", "sensor_unavailable", true);
  }
  out += "}";

  // (Optional) update OLED on each /status hit so API & screen match
  if (ok && display_ok()) {
    display_update(tempF, hum, p_hPa, alt_m, tgtF, mode);
  }

  server.send(200, "application/json", out);
}

// ===== /i2c-scan (handy for debugging) =====
static void handleI2CScan() {
  byte count = 0;
  String out = "[";
  for (byte address = 1; address < 127; address++) {
    Wire.beginTransmission(address);
    if (Wire.endTransmission() == 0) {
      if (count++) out += ",";
      out += "\"0x" + String(address, HEX) + "\"";
    }
  }
  out += "]";
  server.send(200, "application/json", out);
}

static void handleSet() {
  if (!server.hasArg("plain")) {
    server.send(400, "application/json", "{\"error\":\"no_body\"}");
    return;
  }

  String body = server.arg("plain");
  Serial.println("[API] Incoming JSON: " + body);

  // // crude JSON parsing (no ArduinoJson library required)
  // int tIdx = body.indexOf("targetTemp");
  // if (tIdx >= 0) {
  //   int colon = body.indexOf(":", tIdx);
  //   int comma = body.indexOf(",", colon);
  //   if (comma < 0) comma = body.indexOf("}", colon);
  //   targetTempF = body.substring(colon + 1, comma).toFloat();
  //   Serial.println("Updated targetTempF: " + String(targetTempF));
  // }

  // accept /setTemp POST like React expects
  server.on("/setTemp", HTTP_POST, handleSet);

  // inside handleSet, parse "temp" instead of "targetTemp"
  int tIdx = body.indexOf("temp");  // previously "targetTemp"
  if (tIdx >= 0) {
      int colon = body.indexOf(":", tIdx);
     int comma = body.indexOf(",", colon);
      if (comma < 0) comma = body.indexOf("}", colon);
      targetTempF = body.substring(colon + 1, comma).toFloat();
      Serial.println("Updated targetTempF: " + String(targetTempF));  
  }

  int mIdx = body.indexOf("mode");
  if (mIdx >= 0) {
    int colon = body.indexOf(":", mIdx);
    int quote1 = body.indexOf("\"", colon + 1);
    int quote2 = body.indexOf("\"", quote1 + 1);
    hvacMode = body.substring(quote1 + 1, quote2);
    Serial.println("Updated hvacMode: " + hvacMode);
  }

  server.send(200, "application/json", "{\"status\":\"ok\"}");
}

// ===== Server setup =====
void setupAPI() {
  server.on("/status",   HTTP_GET, handleStatus);
  server.on("/set",      HTTP_POST, handleSet);
  server.on("/i2c-scan", HTTP_GET, handleI2CScan);
  server.begin();
  Serial.println(F("[HTTP] server started"));
}

// ===== Public snapshot for OLED / dashboard callers =====
bool api_getSnapshot(float& tempF, float& humidity_pct, float& pressure_hPa,
                     float& altitude_m, float& targetF, String& mode)
{
  if (!bmeInitialized) return false;

  float tC = bme.readTemperature();
  float h  = bme.readHumidity();
  float p  = bme.readPressure();             // Pa
  float a  = bme.readAltitude(1013.25f);     // m

  if (isnan(tC) || isnan(h) || isnan(p) || isnan(a)) return false;

  tempF        = c_to_f(tC);
  humidity_pct = h;
  pressure_hPa = p / 100.0f;
  altitude_m   = a;

  targetF = targetTempF;
  mode    = hvacMode;
  return true;
}
