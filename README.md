# AuraTherm-Aura
CMPE 195A/B Senior Design Project
Full project repository for our group's senior design project. Auratherm is a smart thermostat system that uses an ESP32, motion detection, temperature sensors and a mobile app called Aura.

Table of Contents
1. Overview
2. Features
3. System Architecture
4. Hardawre Architecture
5. Software Architecture
6. How to Run the Project
7. API Endpoints
8. Known Limitations
9. Team Members

1. Overview
   AuraTherm is a smart thermostat that automatically adjusts temperature based on room occupancy. The system uses:
   - ESP32 running an HTTP Server
   - PIR motion sensors
   - BME280 temperature/humidity sensor
   - React Native mobile app
   - Supabase database
   - HTTP API for thermostat control
  The goal of this system is to increase energy efficiency, by only toggling air conditioning in occupied rooms.

2. Features
   - Real time temperature control
   - Occupancy detection
   - ESP32 Thermostat API
   - Mobile app for mode, temperature, set temperature and motion control
   - Automatic mode selection
   - Event logs on app
     
3. System Architecture
   <img width="684" height="564" alt="Screenshot 2025-12-10 at 6 21 31 PM" src="https://github.com/user-attachments/assets/c1064214-0f51-4647-a58f-b194723adb32" />
   
5. Hardware Architecture
   Components:
   - ESP32 Microcontroller
   - BME280 Temperature sensor
   - PIR motion Sensor
   - SSD1306 OLED Display
   - SRD-05VDC-SL-C Relay Module (NOT USED)
   - Red LED
   - Blue LED
   - Breadboard
   - Jumper Cables
   - Power and data microUSB to X cable. (We used microUSB to USB-C for mac)
     
   <img width="1226" height="589" alt="AuraTherm_Diagram_ss" src="https://github.com/user-attachments/assets/d966fb5f-4597-4bf7-9f5e-bfb00c36dbe8" />
   
6. Software Architecture
7. How to Run the Project
   Hardware:
      - Follow hardware setup from diagram
      - Install Arduino IDE:
      - Install the following libraries in Arduino IDE
          - Adafruit BME280
          - Adafruit BusIO
          - Adafruit GFX Library
          - Adafruit SSD1306
          - Adafruit Unified Sensor
          - ArduinoJson
          - DHT sensor library
      - In WiFiManager.cpp, replace ssid and password with hotspot credentials.
      - In PIR motion sensor:
          - Left knob (motion detection delay): 3 clock
            - Sets delay from motion detected to motion not detected to 5-10 seconds.
          - Right knob (range)
      - Pull code and compile.
   Softawre:
   
9. API Endpoints
   GET /status
      {
         currentTemp,
         targetTemp,
         mode,
         motionEnabled,
         modeEnabled
      }
   POST /set-target
      { "temp": 72 }
   POST /set-mode
      { "mode": "heat" }
   POST /motion-enable
      { "value": true }
11. Known Limitations
   - only single room occupancy HVAC control and temperature sensing is supported
     - multiple room funcitonality set for future works
   - only connects to mobile hotspot
12. Team Members
   - Roger Huynh
   - Jeric Montepalco
   - Sabrina Quach
     
   Project Advisor
   - Professor Daphne Chen
