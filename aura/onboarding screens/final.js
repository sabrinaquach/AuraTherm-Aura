import React from 'react';
import {View, Text, Image, StyleSheet } from 'react-native';

import onboardingStyle from '../style/onboardingStyle.js';
import Button from '../component/button.js'
import DotProgress from'../component/dotIndicator.js'

const Final = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={onboardingStyle.title}>You’re All Set!</Text>
            <Text style={[onboardingStyle.subtitle, { textAlign: 'center' }]}>Aura is now adjusting to fit your preferences...</Text>
            <Image 
                source={require('../assets/undraw_relaxing-at-home_vmps.png')} 
                style={[onboardingStyle.image, {resizeMode: 'contain'}]} 
            />
            <View style={onboardingStyle.dotIndicator}>
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
});