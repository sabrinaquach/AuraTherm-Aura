import React from 'react';
import {View, Text, Image, StyleSheet } from 'react-native';

import Button from '../component/button.js'
import DotProgress from'../component/dotIndicator.js'

const Final = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>You’re All Set!</Text>
            <Text style={styles.subtitle}>Aura is now adjusting to fit your preferences...</Text>
            <Image 
                source={require('../assets/undraw_relaxing-at-home_vmps.png')} 
                style={[styles.image, {resizeMode: 'contain'}]} 
            />
            <View style={styles.dotIndicator}>
                <DotProgress 
                    total={5} current={4}
                    title="Great, you're done!"
                />
            </View>
            <Button 
                backgroundColor="#A3C858C9"
                title="Go To Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    )
}

export default Final;

const styles = StyleSheet.create ({
    container: {
        justifyContent: 'center',  
        alignItems: 'center',   
        flex: 1,
        paddingTop: 200,
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
        textAlign: 'center',
    },
    dotIndicator: {
        width: '100%',             
        paddingTop: 70,
    },
});