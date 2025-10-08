// screens/HomeScreen.jsx
import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MainScreensStyle from '../../style/MainScreenStyles';
import useDial from '../../utilties/useDial';
import usePreferences from '../../utilties/usePreferences';
import ThermostatDial from '../../component/thermostat dial/halfCircleDial';

function getDialColor(mode) {
  const m = (mode || '').toString().trim().toLowerCase();
  switch (m) {
    case 'cool':
    case 'cooling':  return '#00BFFF'; 
    case 'heat':
    case 'heating':  return '#FF8C00';  
    case 'off':
    default:         return '#A3C858C9';
  }
}

export default function HomeScreen({ navigation }) {
  const { data: status, loading: statusLoading, error: statusError, setTargetTempOnESP } = useDial();
  const { tempUnit, loading: prefsLoading } = usePreferences();

  const loading = statusLoading || prefsLoading;

  // raw values from device (no conversions)
  const targetTemp  = status?.targetTemp ?? null;
  const currentTemp = status?.currentTemp ?? '—';
  const unitSuffix  = tempUnit ?? ''; 

  const mode = status?.mode ?? 'off';
  const dialColor = getDialColor(mode);

  // choose bounds to match your device's unit
  // If your device is Fahrenheit:
  const min = 50, max = 90;
  // If Celsius, use: const min = 10, max = 30;

  return (
    <View style={styles.container}>
      <Text
        style={MainScreensStyle.title}
        onPress={() => navigation.navigate('Home')}
      >
        Aura
      </Text>

      {/* Dial with live color + interactive setpoint */}
      <ThermostatDial
        dialColor={dialColor}
        value={status?.targetTemp ?? 70}
        min={50}            // or 10 if °C
        max={90}            // or 30 if °C
        onChangeEnd={(v) => setTargetTempOnESP(v)}
      />

      <View style={styles.tempDisplay_container}>
        {loading ? (
          <ActivityIndicator />
        ) : statusError ? (
          <Text style={styles.label}>Failed to load status.</Text>
        ) : (
          <>
            <Text style={styles.tempDisplayText}>
              {targetTemp ?? '—'}
            </Text>
            <Text style={styles.label}>
              Current Temp {currentTemp}°{unitSuffix}
            </Text>

            <View style={styles.humidityRow}>
              <Feather name="droplet" />
              <View style={styles.humidity_percentRow}>
                <Text style={styles.humidityText}>Humidity</Text>
                <Text style={styles.humidityPercent}>45%</Text>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        paddingTop: 100, 
        paddingLeft: 20, 
        backgroundColor: '#fff' 

    },
    tempDisplay_container: {
        position: 'absolute', 
        top: 100, 
        left: 20, 
        right: 0, 
        bottom: 0,
        justifyContent: 'center', 
        zIndex: 1,
    },
    tempDisplayText: {
        color: '#000',
        fontFamily: 'Inter',
        fontSize: 70,
        fontWeight: 'bold',
    },
    label: { 
        fontSize: 15,
        marginTop: 8 
    },
    humidityRow: { 
        flexDirection: 'row', 
        gap: 3, 
        alignItems: 'center' 
    },
    humidity_percentRow: { 
        flexDirection: 'row', 
        gap: 25 
    },
});
