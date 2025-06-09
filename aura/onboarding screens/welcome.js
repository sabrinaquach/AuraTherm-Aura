import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import Button from '../component/button.js'

const Welcome = ({ navigation }) => {
    return (
        
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Aura</Text>
            <Text style={styles.subtitle}>Smart comfort that adapts to you.</Text>
            <Image 
                source={require('../assets/undraw_ordinary-day_ak4e.png')} 
                style={[styles.image, {resizeMode: 'contain'}]} 
            />
            <Text style={styles.text}>Aura's mission aims to promote environmental sustainability and reduced utility costs.</Text>
            <Button 
                backgroundColor="#A3C858C9"
                title="Get Started"
                onPress={() => navigation.navigate('RegisterAccount')}
            />
        </View>
    )
}

export default Welcome;

const styles = StyleSheet.create ({
    container: {
        justifyContent: 'center',  
        alignItems: 'center',   
        flex: 1,
        paddingTop: 250,
        paddingHorizontal: 20, 
        backgroundColor: '#fff',
      },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        paddingBottom: 15,
    },
    image: {
        width: 800,
        height: 230,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '500',
        paddingBottom: 15,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',      
        color: '#444',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#A3C858C9',
        width: '100%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        borderWidth: 0.2,
      },
      buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
      },
});