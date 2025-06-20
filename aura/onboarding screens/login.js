import React, { useState } from 'react';
import {View, Text, Keyboard, Alert, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import onboardingStyle from '../style/onboardingStyle.js';
import Input from '../component/input.js'
import Button from '../component/button.js'
import Loader from '../component/loader.js'
import supabase from '../auth/client.js';
import useLoginValidation from '../utilties/useLoginValidation.js';

const Login = ({ navigation }) => {
    // supabase - login
    const [loading, setLoading] = useState(false);
    
    const handleLogin = async () => {
        setLoading(true);
    
        setTimeout(async () => {
            const { error } = await supabase.auth.signInWithPassword({
                email: inputs.email,
                password: inputs.password,
            });
    
            setLoading(false);
    
            if (error) {
                Alert.alert('Error', error.message);
            } else {
                const onboardingComplete = await AsyncStorage.getItem('onboardingComplete');
                if (onboardingComplete === 'true') {
                    navigation.replace('MainScreens');
                } else {
                    navigation.replace('Welcome');
                }
            }
        }, 2000);
    };

    //call LoginValidation.js - ensure user enters inputs
    const {
        inputs,
        errors,
        handleOnChange,
        handleError,
        validate,
      } = useLoginValidation(handleLogin);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Loader visible={loading} label="Logging Into Your Account..."/>
                <Text style={onboardingStyle.title}>Login</Text>
                <View> 
                    <Input
                        label="Email"
                        placeholder='Enter your email'
                        placeholderTextColor='gray'
                        keyboardType="email-address"
                        error={errors.email}
                        onFocus={() => {
                            handleError(null, 'email')
                        }}
                        onChangeText={text => handleOnChange(text, 'email')}
                    />
                    <Input
                        label="Password"
                        placeholder='Enter a password that is at least 8 characters'
                        placeholderTextColor='gray'
                        error={errors.password}
                        onFocus={() => {
                            handleError(null, 'password')
                        }}
                        onChangeText={text => handleOnChange(text, 'password')}
                        password
                    />
                </View>
                <Button 
                    backgroundColor="#A3C858C9"
                    title="Login" 
                    onPress={validate}
                />
                <Text 
                    style={onboardingStyle.registerDescription}
                    onPress={() => navigation.navigate('RegisterAccount')}
                >
                    Don't have an account? Register
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Login;

const styles = StyleSheet.create ({ 
    container: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 20, 
        backgroundColor: '#fff',
    },
});