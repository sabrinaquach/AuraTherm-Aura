import React, {useEffect, useState, useCallback, useRef } from 'react';
import {View, Text, Image, ScrollView, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';

const Welcome = ({ navigation }) => {
    useEffect (() => {
        const timer = setTimeout (() => {
            navigation.replace('Account');
        }, 2000);
        
        return () => clearTimeout(timer);
      }, [navigation]);

    return (
        <View style={styles.page}>
            <Text style={styles.title}>Welcome to Aura</Text>
            <Text style={styles.subtitle}>Smart comfort that adapts to you.</Text>
            {/* <Image source={require('../assets/image-placeholder.png')} style={styles.image} /> */}
            <Text style={styles.text}>Aura's mission aims to promote environmental sustainability and reduced utility costs.</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Account')}
            >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Welcome;

const styles = StyleSheet.create ({
    page: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',  
        alignItems: 'center',   
        backgroundColor: '#fff',
      },
    title: {
        fontSize: 24,
        paddingBottom: 15,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '400',
        paddingBottom: 15,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',      
        color: '#444',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#A3C858C9',
        width: 350,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
      },
});