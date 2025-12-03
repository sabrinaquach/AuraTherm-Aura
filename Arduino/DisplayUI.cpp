#include "DisplayUI.h"
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET   -1

static Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
static bool g_display_ok = false;

// helpers
static void drawCenteredText(const String &t, int16_t y, uint8_t size = 1) {
  display.setTextSize(size);
  int16_t x1, y1; uint16_t w, h;
  display.getTextBounds(t, 0, 0, &x1, &y1, &w, &h);
  int16_t x = (SCREEN_WIDTH - (int)w) / 2;
  display.setCursor(x, y);
  display.print(t);
}

void display_init(uint8_t addr) {
  g_display_ok = display.begin(SSD1306_SWITCHCAPVCC, addr);
  if (!g_display_ok) return;

  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);
  drawCenteredText("AuraTherm", 10, 2);
  drawCenteredText("Starting...", 36, 1);
  display.display();
}

bool display_ok() { return g_display_ok; }

void display_update(float tempF,
                    float humidity_pct,
                    float pressure_hPa,
                    float altitude_m,
                    float targetF,
                    const String& mode) {
  if (!g_display_ok) return;

  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);

  // Big temperature (centered)
  char tbuf[24];
  snprintf(tbuf, sizeof(tbuf), "%.1f F", tempF);
  drawCenteredText(String(tbuf), 0, 2);

  // Row: Humidity / Pressure
  display.setTextSize(1);
  display.setCursor(0, 30);
  display.print("Hum: ");
  display.print(humidity_pct, 1);
  display.print(" %");

  display.setCursor(64, 30);
  display.print("Pres: ");
  display.print(pressure_hPa, 0);
  display.print(" hPa");

  // Row: Alt / Set / Mode
  display.setCursor(0, 44);
  display.print("Alt: ");
  display.print(altitude_m, 0);
  display.print(" m");

  display.setCursor(0, 56);
  display.print("Set: ");
  display.print(targetF, 0);
  display.print("F  ");
  display.print("Mode: ");
  display.print(mode);

  display.display();
}
