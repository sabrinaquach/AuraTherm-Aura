# AuraTherm-Aura
CMPE 195A/B Senior Design Project
Full project repository for our group's senior design project. Auratherm is a smart thermostat system that uses an ESP32, motion detection, temperature sensors and a mobile app called Aura.

Table of Contents
1. Overview
3. Features
4. System Architecture
5. Hardawre Architecture
6. Software Architecture
7. How to Run the Project
8. API Endpoints
9. Known Limitations
10. Team Members

1. Overview
   AuraTherm is a smart thermostat that automatically adjusts temperature based on room occupancy. The system uses:
   - ESP3e running an HTTP Server
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
6. Software Architecture
7. How to Run the Project
8. API Endpoints
9. Known Limitations
   One of the main limitations of our project is that it doesnt not have per room control, motion detection and temperature sensing. This aspect of our project is part of our future works. However, the main features of the app such as temperature sensing, motion detection HVAC control, and app control works.
   Another limitation of the project is that we are only able to get the app to communicate with the ESP32 through a personal hotspot.
10. Team Members
   - Roger Huynh
   - Jeric Montepalco
   - Sabrina Quach
     
   Project Advisor
   - Professor Daphne Chen
