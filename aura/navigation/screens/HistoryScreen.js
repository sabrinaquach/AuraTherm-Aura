import { React, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import MainScreensStyle from '../../style/MainScreenStyles';
import ControlTab from '../../component/controlTab';
import HistoryBox from '../../component/history/historyBox';
import ThermostatContext from '../../context/ThermostatContext';

export default function HistoryScreen() {
    const { history, data, setTargetTempOnESP } = useContext(ThermostatContext);
    
    const ROOM_LIST = ["Living Room", "Kitchen"];
      
    return (
        <View style={MainScreensStyle.container}>
            <Text style={MainScreensStyle.title}>History</Text>

            <ControlTab labelOne="Today" labelTwo="Yesterday" />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.boxContainer}>
                {(history ?? []).map((event, index) => (
                    <HistoryBox
                    key={index}
                    room={ROOM_LIST[index % 2]}
                    time={event.time}
                    temp={event.currentTemp}
                    currentTemp={event.currentTemp}
                    targetTemp={event.targetTemp}
                    mode={event.mode}
                    type={event.type}
                    />
                ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: "column",
    gap: 12,
    paddingVertical: 10,
  },
});
