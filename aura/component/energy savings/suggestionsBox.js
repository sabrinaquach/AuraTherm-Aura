import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SuggestionsBox({ color = '#EDEDED', style, room, icon, energyValue }) {
    return (
        <View style={[styles.energyBoxContainer, { backgroundColor: color }, style]}>
        <View style={styles.row}>
            <MaterialCommunityIcons 
                name={icon} 
                size={28} color="#333" 
                style={{ opacity: 0.8 }} 
            />
            <Text style={styles.deviceTitle}>{room}</Text>
            <Text style={styles.energyValue}>{energyValue}%</Text>
        </View>

        <View style={styles.footer}>
            <Text style={styles.deviceSub}>126 KW/H</Text>
            <Text style={styles.energyLabel}>Consumed energy</Text>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    energyBoxContainer: {
        width: '100%',
        minHeight: 100,
        borderRadius: 20,
        backgroundColor: '#EDEDED',
        padding: 20,
        marginBottom: -40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        zIndex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    deviceTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginLeft: 8,
    },
    energyValue: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    deviceSub: {
        fontSize: 13,
        color: '#555',
    },
    energyLabel: {
        fontSize: 13,
        color: '#555',
    },
});
