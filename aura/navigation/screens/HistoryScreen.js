import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import MainScreensStyle from '../../style/MainScreenStyles';
import ControlTab from '../../component/controlTab';
import HistoryBox from '../../component/history/historyBox';
import useThermostatStatus from '../../utilties/useThermostatStatus';

export default function HistoryScreen ({ }) {
    const { data: status, motionHistory } = useThermostatStatus();
      
    return (
        <View style={MainScreensStyle.container}>
            <Text style={MainScreensStyle.title}>History</Text>
            <ControlTab 
                labelOne="Today"
                labelTwo="Yesterday"
            />
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Style.HistoryBoxesContainer}>
                {motionHistory.map((event, index) => (
                    <HistoryBox
                        key={index}
                        room="Living Room"
                        time={event.time}
                        temp={event.currentTemp}
                        currentTemp={event.currentTemp}
                        targetTemp={event.targetTemp}
                        mode={event.mode}
                    />
                ))}
            </View>
        </ScrollView>
        </View>
    );
}

const Style = StyleSheet.create ({ 
    HistoryBoxesContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 10,
        gap: 10,
    },
});
