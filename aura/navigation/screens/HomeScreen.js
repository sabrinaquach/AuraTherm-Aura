// screens/HomeScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MainScreensStyle from '../../style/MainScreenStyles';
import useThermostatStatus from '../../utilties/useThermostatStatus';
import usePreferences from '../../utilties/usePreferences';
import { Dimensions } from 'react-native';
const { width: W } = Dimensions.get('window');
import ThermostatDial from '../../component/thermostat dial/halfCircleDial';

function getDialColor(mode) {
  const m = (mode || '').toString().trim().toLowerCase();
  switch (m) {
    case 'cool':
    case 'cooling':  return '#00BFFF';
    case 'heat':
    case 'heating':  return '#FF8C00';
    case 'off':
    default:         return '#A3C858FF';
  }
}

export default function HomeScreen({ navigation }) {
  const { data: status, loading: statusLoading, error: statusError, setTargetTempOnESP } = useThermostatStatus();
  const { tempUnit, loading: prefsLoading } = usePreferences();
  const loading = statusLoading || prefsLoading;

  const targetTemp  = status?.targetTemp ?? null;
  const currentTemp = status?.currentTemp ?? '—';
  const unitSuffix  = tempUnit ?? '';
  const mode        = status?.mode ?? 'off';
  const dialColor   = getDialColor(mode);

  const [uiTemp, setUiTemp] = useState(status?.targetTemp ?? 70);
  const min = 50, max = 90; // use 10..30 for °C

  useEffect(() => {
    if (status?.targetTemp != null) setUiTemp(status.targetTemp);
  }, [status?.targetTemp]);

  return (
    <View style={styles.container}>
      <Text style={MainScreensStyle.title} onPress={() => navigation.navigate('Home')}>Aura</Text>

<ThermostatDial
      dialColor={dialColor}
      value={uiTemp}
      min={50}
      max={90}
      onChange={setUiTemp}
      onChangeEnd={(v) => { setUiTemp(v); setTargetTempOnESP(v); }}
      width={W * 1.05}
      height={W * 1.05}
      xShiftR={1.02}
      yShiftR={0.08}
      mirrorX
      mirrorMode="full"  
      progressWidth={18}
      trackWidth={12}
      glowSigma={28}
      innerGap={44}
      innerWidth={4}
    />



      <View pointerEvents="none" style={styles.tempDisplay_container}>
        {loading ? (
          <ActivityIndicator />
        ) : statusError ? (
          <Text style={styles.label}>Failed to load status.</Text>
        ) : (
          <>
            <Text style={styles.tempDisplayText}>{targetTemp ?? '—'}</Text>
            <Text style={styles.label}>Current Temp {currentTemp}°{unitSuffix}</Text>

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
  container: { flex: 1, paddingTop: 100, paddingLeft: 20, backgroundColor: '#fff' },
  tempDisplay_container: {
    position: 'absolute', top: 100, left: 20, right: 0, bottom: 0,
    justifyContent: 'center', zIndex: 1,
  },
  tempDisplayText: { color: '#000', fontFamily: 'Inter', fontSize: 70, fontWeight: 'bold' },
  label: { fontSize: 15, marginTop: 8 },
  humidityRow: { flexDirection: 'row', gap: 3, alignItems: 'center' },
  humidity_percentRow: { flexDirection: 'row', gap: 25 },
});
