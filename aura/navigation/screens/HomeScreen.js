import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, TextInput, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';                 // 🔹 add
import { createClient } from '@supabase/supabase-js';        
import supabase from '../../auth/client';            
import MainScreensStyle from '../../style/MainScreenStyles';
import useThermostatStatus from '../../utilties/useThermostatStatus';
import usePreferences from '../../utilties/usePreferences';
import ThermostatDial from '../../component/thermostat dial/halfCircleDial';


const { width: W, height: H } = Dimensions.get('window');
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

  //occupied rooms state 
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  //load rooms 
  useEffect(() => {
    let mounted = true;
    async function load() {
      setRoomsLoading(true);
      const { data, error } = await supabase
        .from('rooms')
        .select('id,name,occupied,desired_temp')
        .order('name', { ascending: true });
      if (mounted && !error && data) setRooms(data);
      setRoomsLoading(false);
    }
    load();
    const ch = supabase
      .channel('rooms-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms' }, (payload) => {
        setRooms((prev) => {
          const r = (payload.new || payload.old);
          const map = new Map(prev.map(x => [x.id, x]));
          if (payload.eventType === 'DELETE') map.delete(r.id);
          else map.set(r.id, r);
          return Array.from(map.values()).sort((a,b)=>a.name.localeCompare(b.name));
        });
      })
      .subscribe();
    return () => { mounted = false; supabase.removeChannel(ch); };
  }, []);

  const occupiedOptions = useMemo(() =>
    rooms.filter(r => r.occupied).map(r => ({
      label: r.name.replace(/_/g, ' '),
      value: r.id,
      current: r.desired_temp ?? null,
    }))
  , [rooms]);

  const occupiedCount = occupiedOptions.length;
  const selectedRoomLabel =
    occupiedOptions.find(o => o.value === selectedRoomId)?.label || 'Living Room';


  const loading = statusLoading || prefsLoading || roomsLoading;

  const targetTemp  = status?.targetTemp ?? null;
  const currentTemp = status?.currentTemp ?? '—';
  const unitSuffix  = tempUnit ?? '';
  const mode        = status?.mode ?? 'off';
  const dialColor   = getDialColor(mode);

  const [uiTemp, setUiTemp] = useState(status?.targetTemp ?? 70);

  //display temp
  const formatTemp = (v) => {
    if (v == null || v === '—' || Number.isNaN(Number(v))) return '—';
    const n = Number(v);
    return unitSuffix === 'C' ? (Math.round(n * 2) / 2).toFixed(1) : Math.round(n).toString();
  };

  useEffect(() => {
    if (status?.targetTemp != null) setUiTemp(status.targetTemp);
  }, [status?.targetTemp]);

  //when a room is picked, use current desired_temp
  useEffect(() => {
    if (!selectedRoomId) return;
    const found = occupiedOptions.find(o => o.value === selectedRoomId);
    if (found && found.current != null) setUiTemp(found.current);
  }, [selectedRoomId, occupiedOptions]);

  //commit temp for selected room
  const commitTemp = async (val) => {
    if (!selectedRoomId) return;
    const commit = unitSuffix === 'C' ? Math.round(val * 2) / 2 : Math.round(val);
    setUiTemp(commit);

    const { error } = await supabase.from('rooms').update({ desired_temp: commit }).eq('id', selectedRoomId);
    if (error) console.warn('Failed to save desired_temp:', error);
    // setTargetTempOnESP(commit);
  };

  const disabled = occupiedOptions.length === 0;

  return (
    <View style={styles.container}>
      {/* occupied room dropdown */}
      <View style={styles.header}>
        <Dropdown
          data={occupiedOptions}
          labelField="label"
          valueField="value"
          value={selectedRoomId}
          placeholder={`${occupiedCount} Rooms Occupied`}
          onChange={(item) => setSelectedRoomId(item.value)}
          style={styles.headerDropdown}
          placeholderStyle={styles.headerText}
          selectedTextStyle={styles.headerText}
          containerStyle={styles.headerMenu}
          renderRightIcon={() => <Feather name="chevron-down" size={16} color="#000" />}
          search
          searchPlaceholder="Search room..."
          disable={occupiedCount === 0}
        />
      </View>

      <ThermostatDial
        dialColor={dialColor}
        value={uiTemp}
        min={50}
        max={90}
        onChange={setUiTemp}
        onChangeEnd={commitTemp}   
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
  container: {
    flex: 1, 
    paddingTop: 100, 
    paddingLeft: 20, 
    backgroundColor: '#fff', 
    overflow: 'visible'
  },
  headerDropdown: {
    height: 28,
    paddingHorizontal: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
    width: 180,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  headerMenu: {
    borderRadius: 12,
    paddingVertical: 6,
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
    fontWeight: 'bold'
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
