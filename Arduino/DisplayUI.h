#pragma once
#include <Arduino.h>

// Initialize SSD1306 OLED. addr = 0x3C (most 0.96" OLEDs) or 0x3D.
void display_init(uint8_t addr = 0x3C);

// Update the screen with new readings (pass °F for temps, hPa, m).
void display_update(float tempF,
                    float humidity_pct,
                    float pressure_hPa,
                    float altitude_m,
                    float targetF,
                    const String& mode);

// True if the OLED successfully initialized.
bool display_ok();
