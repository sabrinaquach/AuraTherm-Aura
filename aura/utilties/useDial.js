import React from "react";
import { View, Text, StyleSheet } from 'react-native';

export default function useDial ({ }) {
    return (
<View style={styles.container}>
            <Text 
                style={MainScreensStyle.title}
                onPress={() => navigation.navigate('Home')}
            >
            Aura</Text>
            <ThermostatDial />
        </View>
    );
};