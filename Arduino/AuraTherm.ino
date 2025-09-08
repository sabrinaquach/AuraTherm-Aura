#include "WiFiManager.h"
#include "ThermostatAPI.h"

void setup() {
  Serial.begin(115200);
  delay(1000);  // give serial time to start
  Serial.println("\n--- AuraTherm Wi-Fi Test ---");
  setupWiFi();   // try to connect to Wi-Fi
  setupAPI();
}

void loop() {
  Serial.print("Wi-Fi status: ");
  Serial.println(getWiFiStatus());
  delay(5000);

  server.handleClient();
}
