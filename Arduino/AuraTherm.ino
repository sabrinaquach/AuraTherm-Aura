#include "WiFiManager.h"
#include "ThermostatAPI.h"
#include "DisplayUI.h"
#include "PIRSensor.h"
#include <WebServer.h>

// ------- PIR config -------
static constexpr uint8_t  PIR_GPIO      = 14;          
static constexpr uint32_t PIR_WARMUP_MS = 30 * 1000UL; 
PIRSensor pir;

// ------- Display pacing -------
static uint32_t lastOLED = 0;
static uint32_t lastDbg  = 0;

// 'server' lives in ThermostatAPI
extern WebServer server;
extern bool wifiConnected; 
extern bool motionEnabled;

bool motionRaw() {
    return pir.raw();
}

void setup() {
  Serial.begin(115200);
  delay(200);
  Serial.println("\n[AuraTherm] Booting...");

  // 1) Wi-Fi
  setupWiFi();
  Serial.println("[AuraTherm] Waiting for Wi-Fi...");
  
  // 2) Sensors (BME280 on I2C)
  temp_setup();

  // 3) HTTP API
  setupAPI();
  
  // 3a) RAW motion endpoint
  server.on("/motion", HTTP_GET, []() {
    bool raw = motionEnabled ? digitalRead(PIR_GPIO) : false;

    String body = "{";
    body += "\"motion_detected\":";
    body += raw ? "true" : "false";
    body += "}";

    server.send(200, "application/json", body);
  });

  // 4) OLED
  display_init(0x3C);

  // 5) PIR init
  pir.begin(PIR_GPIO, /*usePulldown=*/true, /*warmupMs=*/PIR_WARMUP_MS);
  Serial.printf("[PIR] Using GPIO %u | warm-up %lus\n",
                PIR_GPIO, PIR_WARMUP_MS / 1000);

  //LED setup
  pinMode(32, OUTPUT);  // Blue LED
  pinMode(33, OUTPUT);  // Red LED
  digitalWrite(32, LOW); // Blue LED off initially
  digitalWrite(33, LOW); // Red LED off initially

  Serial.println("[AuraTherm] Ready.");
}

void loop() {
  uint32_t now = millis();
  checkWiFi();
  server.handleClient();

  float tempF, tgtF;
  String mode;

  // -------- RAW PIR CONTROL MODEL --------
  bool raw = false;
  if (motionEnabled) {
    raw = digitalRead(PIR_GPIO);
  }

  // ----- AUTOMATIC HVAC EFFECT (NOT CONTROL) -----
  static String effectiveMode = "Off";

  if (motionEnabled) {
      
      hvacMode = "Heating/Cooling"; //restore auto mode when motionEnabled = true
      if (raw) {
          if (api_getSnapshot(tempF, tgtF, mode)) {
              effectiveMode = mode;
          } else {
              effectiveMode = "Off";
              hvacMode = "Off";
          }
      } else {
          effectiveMode = "Off";   // motion enabled, no motion → force off
          hvacMode = "Off";
      }

  } else {
      // motion disabled → trust API fully (manual mode)
      if (api_getSnapshot(tempF, tgtF, mode)) {
          effectiveMode = mode;
      } else {
          effectiveMode = "Off";
      }
  }
  
  // ===== LED STATUS INDICATORS =====

  // Default OFF
  digitalWrite(32, LOW); // Blue OFF
  digitalWrite(33, LOW); // Red OFF

  if (effectiveMode == "Cool") {
      digitalWrite(32, HIGH); // Blue ON (cooling)
  }
  else if (effectiveMode == "Heat") {
      digitalWrite(33, HIGH); // Red ON (heating)
  }
  // else → Off → both off



  // -------- DEBUG HEARTBEAT --------
  if (now - lastDbg >= 1000) {
    lastDbg = now;

    if (motionEnabled) {
      Serial.printf("[HB] %lus | PIR raw=%d\n", now / 1000, raw);
    } else {
      Serial.printf("[HB] %lus | PIR DISABLED\n", now / 1000);
    }
  }

  // --- OLED refresh every 1000 ms ---
  if (now - lastOLED >= 1000) {
    lastOLED = now;

    if (api_getSnapshot(tempF, tgtF, mode)) {
      display_update(tempF, tgtF, mode);  
    }
  }

  delay(5);
}

