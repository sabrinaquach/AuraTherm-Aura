import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MainScreensStyle from '../../style/MainScreenStyles';
import ControlTab from '../../component/controlTab';
import HistoryBox from '../../component/history/historyBox';

export default function HistoryScreen ({ navigation }) {
    return (
        <View style={MainScreensStyle.container}>
            <Text style={MainScreensStyle.title}>History</Text>
            <ControlTab 
                labelOne="Today"
                labelTwo="Yesterday"
            />

            <View style={Style.HistoryBoxesContainer}>
                <HistoryBox 
                    room="Bedroom"         //test values before connected with hardware
                    temp="60"
                    time="10:30 AM"         //need to code the time logged when user changes temp
                    unit="unit"
                    mode="Auto"
                    currentTemp="80"
                />
                <HistoryBox 
                    room="Bedroom"       
                    temp="80"
                    time="11:28 PM"
                    unit="unit"
                    mode="Manual"
                    currentTemp="60"
                />
            </View>
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
