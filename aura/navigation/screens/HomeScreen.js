import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import MainScreensStyle from '../../style/MainScreenStyles';
import ThermostatDial from '../../component/thermostat dial/halfCircleDial';

export default function HomeScreen ({ navigation, tempDisplay, humidityPercent }) {
    return (
        <View style={styles.container}>
            <Text 
                style={MainScreensStyle.title}
                onPress={() => navigation.navigate('Home')}
            >
            Aura</Text>
            <ThermostatDial />
            <View style={styles.tempDisplay_container}>
                <Text style={styles.tempDisplayText}>OFF</Text> {/* {tempDisplay} */}
                <View style={styles.humidityRow}>
                    <Feather name="droplet"/>
                    <View style={styles.humidity_percentRow}>
                        <Text style={styles.humidityText}>Humidity</Text>
                        <Text style={styles.humidityPercent}>45%</Text> {/* {humidityPercent} */}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingLeft: 20,
        // paddingHorizontal: 20, 
        backgroundColor: '#fff',
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
        font: 'Inter',
        fontSize: 70,
        fontWeight: 'bold',
    },
    humidityRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center',
    },
    humidity_percentRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: 25,
    },
});