// screens/HomeScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MainScreensStyle from '../../style/MainScreenStyles';
import useThermostatStatus from '../../utilties/useThermostatStatus';
import usePreferences from '../../utilties/usePreferences';
import ThermostatDial from '../../component/thermostat dial/halfCircleDial';

const { width: W, height: H } = Dimensions.get('window');
// Pick a size you like (try 1.35–1.6 for a big dial)
const SIZE = Math.min(W, H) * 2;

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

  // Format for display (whole °F, or 0.5°C)
  const formatTemp = (v) => {
    if (v == null || v === '—' || Number.isNaN(Number(v))) return '—';
    const n = Number(v);
    return unitSuffix === 'C' ? (Math.round(n * 2) / 2).toFixed(1) : Math.round(n).toString();
  };

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
        onChangeEnd={(v) => {
          const commit = unitSuffix === 'C' ? Math.round(v * 2) / 2 : Math.round(v);
          setUiTemp(commit);
          setTargetTempOnESP(commit);
        }}
        width={SIZE}
        height={SIZE}
        xShiftR={0.15}  
        yShiftR={-0.3}   
        mirrorX
        mirrorMode="full"
        mode="infinite"
        progressWidth={15}
        trackWidth={14}
        handleRadius={14}
        innerGap={54}
        innerWidth={4}
      />

      <View pointerEvents="none" style={styles.tempDisplay_container}>
        {loading ? (
          <ActivityIndicator />
        ) : statusError ? (
          <Text style={styles.label}>Failed to load status.</Text>
        ) : (
          <>
            <Text style={styles.tempDisplayText}>{formatTemp(uiTemp)}</Text>
            <Text style={styles.label}>Current Temp {formatTemp(currentTemp)}°{unitSuffix}</Text>

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
  // overflow: 'visible' lets the dial bleed off-screen to the right/top
  container: { flex: 1, paddingTop: 100, paddingLeft: 20, backgroundColor: '#fff', overflow: 'visible' },
  tempDisplay_container: {
    position: 'absolute', top: 100, left: 20, right: 0, bottom: 0,
    justifyContent: 'center', zIndex: 1,
  },
  tempDisplayText: { color: '#000', fontFamily: 'Inter', fontSize: 70, fontWeight: 'bold' },
  label: { fontSize: 15, marginTop: 8 },
  humidityRow: { flexDirection: 'row', gap: 3, alignItems: 'center' },
  humidity_percentRow: { flexDirection: 'row', gap: 25 },
});