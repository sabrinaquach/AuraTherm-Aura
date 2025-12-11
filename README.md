# AuraTherm-Aura
CMPE 195A/B Senior Design Project
Full project repository for our group's senior design project. Auratherm is a smart thermostat system that uses an ESP32, motion detection, temperature sensors and a mobile app called Aura.

Table of Contents
1. Overview
2. Features
3. System Architecture
4. Hardware Architecture
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
   Aura consists of embedded firmware (ESP32), backend services (Supabase), and the mobile app (React Native Expo). Each layer communicates through HTTP requests and real-time listeners to keep temperature, occupancy, and mode states synchronized.
   - ESP32 Firmware
      - Implements HTTP server to expose thermostat control endpoints
      - Reads temperature, humidity, and pressure data from the BME280 sensor.
      - Listens for motion events using the PIR sensor.
      - Posts state changes in real-time.
      - Store modes: cool, heat, off.
   - Mobile App (React Native Expo)
      - Displays real-time sensor values from ESP32.
      - User interface for:
         - Setting target temperature
         - Toggling mode (cool, heat, off)
         - Enabling/disabiling motion control
         - Viewing event logs in the History screen
   - Communicates with ESP32 through direct HTTP requests to its local IP
   - Supabase Backend
      - Stores history logs such as temperature changes, motion events, mode changes.
      - Manages user authentication.
      - Stores and updates user preferences and profile pictures.

   Data Flow Summary
   <img width="1920" height="1080" alt="Add first action" src="https://github.com/user-attachments/assets/9532a86b-b35b-405c-bbf6-a791939f9c91" />
   
      1. ESP32 reads sensors and updates JSON state
      2. App fetches state from /status
      3. App sends control commands through POST requests
      4. ESP32 updates internal state and displays on OLED sensor
      5. App displays logs and real-time updates
   
8. How to Run the Project
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
   1. Install Node.js and Expo CLI
   2. Run:
         npm install
         npx expo start
   3. In the app, configure:
         - ESP32 local IP address
         - Supabase URL and anon key
   
9. API Endpoints
   - GET /status
      {
         currentTemp,
         targetTemp,
         mode,
         motionEnabled,
         modeEnabled
      }
   - POST /set-target
      { "temp": 72 }
   - POST /set-mode
      { "mode": "heat" }
   - POST /motion-enable
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
