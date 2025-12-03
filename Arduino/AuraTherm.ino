#include "WiFiManager.h"
#include "ThermostatAPI.h"
#include "DisplayUI.h"     // SSD1306 screen module
#include "PIRSensor.h"
#include <WebServer.h>     // provided/used by ThermostatAPI

// ------- PIR config -------
static constexpr uint8_t  PIR_GPIO       = 14;          // HC-SR501 OUT -> GPIO14
static constexpr uint32_t PIR_HOLD_MS    = 90 * 1000UL; // stay "occupied" 90s after last motion
static constexpr uint32_t PIR_WARMUP_MS  = 30 * 1000UL; // ignore triggers during warm-up
PIRSensor pir(PIR_HOLD_MS);

// ------- Display pacing -------
static uint32_t lastOLED = 0;
// Debug heartbeat pacing
static uint32_t lastDbg  = 0;

// 'server' lives in ThermostatAPI
extern WebServer server;

void setup() {
  Serial.begin(115200);
  delay(200);
  Serial.println("\n[AuraTherm] Booting...");

  // 1) Wi-Fi
  setupWiFi();

  // 2) Sensors (BME280 on I2C: SDA=21, SCL=22)
  temp_setup();

  // 3) HTTP API (/status, /i2c-scan, etc.)
  setupAPI();

  // 3a) Add /motion endpoint -> {"motion_detected":true/false}
  server.on("/motion", HTTP_GET, []() {
    String body = "{";
    body += pir.jsonKV("motion_detected");
    body += "}";
    server.send(200, "application/json", body);
  });

  // 4) OLED (0x3C is most common; use 0x3D if needed)
  display_init(0x3C);

  // 5) PIR init
  pir.begin(PIR_GPIO, /*usePulldown=*/true, /*warmupMs=*/PIR_WARMUP_MS);
  Serial.printf("[PIR] Using GPIO %u | warm-up %lus | hold %lus\n",
                PIR_GPIO, PIR_WARMUP_MS/1000, PIR_HOLD_MS/1000);

  Serial.println("[AuraTherm] Ready.");
}

void loop() {
  //checkWiFi();
  //server.handleClient();

  // --- PIR update & prints ---
  pir.update();

  // Print on motion edge
  if (pir.motionEdge()) {
    Serial.println("[PIR] Motion edge detected (occupied=true)");
  }

  // Print when occupied state changes
  static bool lastOcc = false;
  bool occ = pir.occupied();
  if (occ != lastOcc) {
    lastOcc = occ;
    Serial.printf("[PIR] Occupied = %s\n", occ ? "true" : "false");
  }

  // 1s heartbeat (also shows raw pin state)
  uint32_t now = millis();
  if (now - lastDbg >= 1000) {
    lastDbg = now;
    int raw = digitalRead(PIR_GPIO);
    Serial.printf("[HB] %lus | PIR raw=%d | occ=%d\n", now/1000, raw, (int)occ);
  }

  // END PIR

  // --- OLED refresh every 1000 ms (unchanged) ---
  if (now - lastOLED >= 1000) {
    lastOLED = now;

    float tempF, hum, p_hPa, alt_m, tgtF;
    String mode;
    if (api_getSnapshot(tempF, hum, p_hPa, alt_m, tgtF, mode)) {
      display_update(tempF, hum, p_hPa, alt_m, tgtF, mode);
      // (Optional) you can extend display_update(...) to also show occ if desired
    }
  }

  delay(5);
}
