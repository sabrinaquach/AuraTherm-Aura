#include "WiFiManager.h"
#include "ThermostatAPI.h"
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include "esp_log.h"

unsigned long lastWiFiPrint = 0;
const unsigned long wifiPrintInterval = 60000; // 1 min

unsigned long lastTempRead = 0;
const unsigned long tempInterval = 5000; // 2 sec

void setup() {

 esp_log_level_set("i2c", ESP_LOG_NONE); //disable I2C logs

  Serial.begin(115200);
  delay(1000);  
  Serial.println("\n--- AuraTherm Setup ---");

  // //Initialize I2C bus
  // Wire.begin(21,22); //SDA = 21, SCL = 22
  // delay(100);

  setupWiFi();  // start Wi-Fi connection
  setupAPI();   // start HTTP server
  temp_setup(); // initialize BME280
}

void loop() {
  unsigned long now = millis();

  // Non-blocking Wi-Fi status print
  // if (now - lastWiFiPrint >= wifiPrintInterval) {
  //   lastWiFiPrint = now;
  //   Serial.print("Wi-Fi status: ");
  //   Serial.println(getWiFiStatus());
  // }


  // Non-blocking temperature read
  if (now - lastTempRead >= tempInterval) {
    lastTempRead = now;

    updateCurrentTemp();  // use the proper update function

    Serial.print("Temperature: ");
    Serial.print(currentTemp);
    Serial.println(" °F");
    Serial.println("--------------------");  
  }

  // Handle web server clients continuously
  server.handleClient();

  // Non-blocking Wi-Fi connection check
  checkWiFi();  // function from WiFiManager.cpp
}









// //Debug temp only
// Adafruit_BME280 bme; // I2C instance
// #define BME_ADDRESS 0x76

// void setup() {
//   Serial.begin(115200);
//   delay(1000);
//   Serial.println("Initializing BME280...");

//   Wire.begin(21, 22, 100000); // SDA, SCL pins
//   delay(100);

//   for (byte address = 1; address < 127; address++) {
//     Wire.beginTransmission(address);
//     if (Wire.endTransmission() == 0) {
//       Serial.print("I2C device found at 0x");
//       Serial.println(address, HEX);
//     }
//   }

//   if (!bme.begin(BME_ADDRESS)) {
//     Serial.println("BME280 not detected! Check wiring.");
//   } else {
//     Serial.print("Detected sensor ID: 0x");
//     Serial.println(bme.sensorID(), HEX);
//     Serial.println("BME280 initialized successfully!");
//     delay(100);
//   }
// }

// void loop() {
//   // Read temperature in Celsius and convert to Fahrenheit
//   float tempC = bme.readTemperature();

//   if (isnan(tempC)) {
//     Serial.println("Temperature read failed (NaN)");
//   } else {
//     float tempF = tempC * 9.0 / 5.0 + 32.0;
//     Serial.print("Temperature: ");
//     Serial.print(tempF);
//     Serial.println(" °F");
//   }

//   delay(2000); // wait 2 seconds between reads
// }






//Dynamic vars, app temp updates -> update here
// void setup() {
//   Wire.begin(21, 22); // SDA, SCL
//   Serial.begin(115200);
//   while (!Serial);
//   Serial.println("\nI2C Scanner");
// }

// void loop() {
//   byte error, address;
//   int nDevices = 0;
//   Serial.println("Scanning...");

//   for (address = 1; address < 127; address++) {
//     Wire.beginTransmission(address);
//     error = Wire.endTransmission();

//     if (error == 0) {
//       Serial.print("I2C device found at 0x");
//       if (address < 16) Serial.print("0");
//       Serial.print(address, HEX);
//       Serial.println(" !");
//       nDevices++;
//     } else if (error == 4) {
//       Serial.print("Unknown error at address 0x");
//       if (address < 16) Serial.print("0");
//       Serial.println(address, HEX);
//     }
//   }

//   if (nDevices == 0)
//     Serial.println("No I2C devices found\n");
//   else
//     Serial.println("done\n");

//   delay(5000);
// }

