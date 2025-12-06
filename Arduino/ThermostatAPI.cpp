#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_BME280.h>
#include <WebServer.h>

#include "ThermostatAPI.h"
#include "DisplayUI.h"

// ===== History =====
struct HistoryEvent {
  String type;     
  String timestamp;
};

HistoryEvent historyLog[50];  
int historyIndex = 0;

String timestamp() {
  unsigned long ms = millis();
  unsigned long sec = ms / 1000;
  unsigned long min = sec / 60;
  unsigned long hr  = min / 60;

  char buffer[20];
  sprintf(buffer, "%02lu:%02lu:%02lu", hr % 24, min % 60, sec % 60);
  return String(buffer);
}

void pushHistory(String type) {
  historyLog[historyIndex % 50] = { type, timestamp() };
  historyIndex++;
}

// ===== Globals =====
WebServer server(80);
Adafruit_BME280 bme;
bool bmeInitialized = false;
bool motionEnabled = true;

float  targetTempF = 72.0f;
String hvacMode    = "Off";  // "Heating" / "Cooling" / "Off"

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

// ===== History tracking globals =====
static float lastTempF = NAN;
static bool  lastMotion = false;

// ===== /status handler =====
static void handleStatus() {
  float tempF, tgtF;
  String mode;

  bool ok = api_getSnapshot(tempF, tgtF, mode);

  String out = "{";
  if (ok) {
    out += jsonKV("currentTemp", tempF);
    out += jsonKV("targetTemp",  tgtF);
    out += jsonKV("mode",        mode,   true);

    out += ",\"motionEnabled\":";
    out += motionEnabled ? "true" : "false";

        // ===== HISTORY LOGGING =====
        // Temp change
        if (isnan(lastTempF) || fabs(tempF - lastTempF) >= 0.1f) { // log if change >= 0.1°F
            pushHistory("TempChange");
            lastTempF = tempF;
        }

        // Motion detected
        if (motionEnabled && !lastMotion) { // log only on rising edge
            pushHistory("MotionDetected");
        }
        lastMotion = motionEnabled;

  } else {
    out += jsonKV("error", "sensor_unavailable", true);
  }
  out += "}";

  // (Optional) update OLED on each /status hit so API & screen match
  if (ok && display_ok()) {
    display_update(tempF, tgtF, mode);
  }

  server.send(200, "application/json", out);
}

// ===== /i2c-scan  =====
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

    // Parse targetTemp
    int tIdx = body.indexOf("targetTemp");
    if (tIdx >= 0) {
        int colon = body.indexOf(":", tIdx);
        int comma = body.indexOf(",", colon);
        if (comma < 0) comma = body.indexOf("}", colon);
        targetTempF = body.substring(colon + 1, comma).toFloat();
        Serial.println("Updated targetTempF: " + String(targetTempF));
    }

    // Parse hvacMode
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

static void handleMotionSet() {
  if (!server.hasArg("plain")) {
    server.send(400, "application/json", "{\"error\":\"no_body\"}");
    return;
  }

  String body = server.arg("plain");
  Serial.println("[Motion] RAW: " + body);

  if (body.indexOf("true") >= 0)  motionEnabled = true;
  if (body.indexOf("false") >= 0) motionEnabled = false;

  Serial.println("[Motion] motionEnabled = " + String(motionEnabled));

  server.send(200, "application/json", "{\"status\":\"ok\"}");
}

// ===== /history handler =====
static void handleHistory() {
  String out = "[";
  int count = min(historyIndex, 50);

  for (int i = 0; i < count; i++) {
    int idx = (historyIndex - count + i) % 50;
    out += "{";
    out += jsonKV("type", historyLog[idx].type);
    out += jsonKV("time", historyLog[idx].timestamp, true);
    out += "}";
    if (i < count - 1) out += ",";
  }
  out += "]";
  server.send(200, "application/json", out);
}

// ===== Server setup =====
void setupAPI() {
  server.on("/status",   HTTP_GET, handleStatus);
  server.on("/set", HTTP_ANY, handleSet);
  server.on("/setTemp",  HTTP_POST, handleSet);
  server.on("/motion/set", HTTP_POST, handleMotionSet);
  server.on("/i2c-scan", HTTP_GET, handleI2CScan);
  server.on("/history", HTTP_GET, handleHistory);
  server.begin();
  Serial.println(F("[HTTP] server started"));
}

// ===== Public snapshot for OLED / dashboard callers =====
bool api_getSnapshot(float& tempF, float& targetF, String& mode)
{
    if (!bmeInitialized) return false;

    float tC = bme.readTemperature();
    if (isnan(tC)) return false;

    tempF   = c_to_f(tC);
    targetF = targetTempF;

    const float delta = tempF - targetTempF;
    const float HYST = 0.25f;

    if (hvacMode == "Off") {
        mode = "Off";
    } else if (hvacMode == "Heating/Cooling") {
        if (delta < -HYST)      mode = "Heat";
        else if (delta > HYST)  mode = "Cool";
        else                     mode = "Idle";
    } else {
        mode = hvacMode; // respect manual Heat/Cool
    }

    return true;
}
