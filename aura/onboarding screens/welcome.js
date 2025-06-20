import React from 'react';
import {View, Text, Image, StyleSheet } from 'react-native';

import onboardingStyle from '../style/onboardingStyle.js';
import Button from '../component/button.js'
import DotProgress from'../component/dotIndicator.js'

const Welcome = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={onboardingStyle.title}>Welcome to Aura</Text>
            <Text style={onboardingStyle.subtitle}>Smart comfort that adapts to you.</Text>
            <Image 
                source={require('../assets/undraw_ordinary-day_ak4e.png')} 
                style={[onboardingStyle.image, {resizeMode: 'contain'}]} 
            />
            <Text style={onboardingStyle.text}>Aura's mission aims to promote environmental sustainability and reduced utility costs.</Text>
            <View style={onboardingStyle.dotIndicator}>
                <DotProgress 
                    total={4} current={0}
                    title="Welcome"
                />
            </View>
            <Button 
                backgroundColor="#A3C858C9"
                title="Get Started"
                onPress={() => navigation.navigate('Preferences')}
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
    paddingTop: 200,
    paddingHorizontal: 20, 
    backgroundColor: '#fff',
},
});