import React, {useEffect, useState, useCallback, useRef } from 'react';
import {View, Text, Image, ScrollView, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';

const Preferences = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Home</Text>
        </View>
    )
}

export default Preferences;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 20, 
        backgroundColor: '#fff',
    },
})