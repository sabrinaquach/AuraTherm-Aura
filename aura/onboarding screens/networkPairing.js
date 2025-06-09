import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NetworkPairing = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Your Wifi Network</Text>
        </View>
    )
}

export default NetworkPairing

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 20, 
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
})