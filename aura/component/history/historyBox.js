import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import usePreferences from '../../utilties/usePreferences';

export default function HistoryBox ({ time, room, temp, currentTemp, targetTemp, mode }) {
    const { tempUnit: savedTempUnit } = usePreferences();
    const unit = savedTempUnit || 'F';

    //temp icon color change depending if temp is increasing or decreasing
    const isIncreasing = Number(targetTemp) > Number(temp);
    const actionText = isIncreasing ? 'Increasing' : 'Decreasing';
    const thermometerColor = isIncreasing ? '#FFA069C9' : '#69B7FFC9';

    //background color changing depending if auto or manual mode
    const isAuto = mode?.toLowerCase() === 'auto';
    const modeBackground = isAuto ? '#D9D9D9' : '#B4B4B4';
    
    return (
        <View style={Style.historyContainer}>
            <View style={Style.historyRow}>
                <Feather 
                    name="users"
                    size="28"
                />
                <View style={Style.textContainer}>
                    <Text style={Style.roomText}>Motion Detected in {room}</Text>
                    <Text style={Style.tempText}>{actionText} temperature to {targetTemp}°{unit}</Text>

                    <View style={Style.textBottomRow}>
                        <Text style={Style.timeText}>{time}</Text>

                        <View style={Style.textBottomRightContainer}>
                            <View style={[Style.modeContainer, { backgroundColor: modeBackground, borderColor: modeBackground }]}>
                            <Text style={Style.modeText}>
                            {mode === "Heating/Cooling"
                                ? (temp < targetTemp ? "Heating" : "Cooling")
                                : mode}
                            </Text>
                            </View>
                            <View style={Style.currentTempContainer}>
                                <Feather 
                                    name="thermometer"
                                    size="16"
                                    color={thermometerColor}
                                />
                                <Text style={Style.currentTempText}>{temp}°{unit}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            
            
        </View>
    );
}


const Style = StyleSheet.create ({ 
    historyContainer: {
        color: 'black',
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#EDEDED',
        backgroundColor: '#EDEDED',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    historyRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
    },
    textContainer: {
        flex: 1, 
    },
    roomText: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    tempText: {
        fontSize: 14,
        paddingTop: 1,
    },
    textBottomRow: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timeText: {
        fontSize: 15,
    },
    textBottomRightContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    modeContainer: {
        color: 'black',
        paddingHorizontal: 12,
        height: 22,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        // borderColor: 'modeBackground',
        // backgroundColor: 'modeBackground',
    },
    modeText: {
        textAlign: 'center',
        fontSize: 15,
        textTransform: 'capitalize',
    },
    currentTempContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }, 
    currentTempText: {
        fontSize: 15,
    },
});


