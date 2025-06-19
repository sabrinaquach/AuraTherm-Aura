import React, { useState } from 'react';
import {View, Text, Keyboard, Alert, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import onboardingStyle from '../style/onboardingStyle.js';
import Input from '../component/input.js'
import Button from '../component/button.js'
import Loader from '../component/loader.js'
import DotProgress from'../component/dotIndicator.js'
import supabase from '../auth/client.js';

const Login = ({ navigation }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const validate = () => {
        Keyboard.dismiss();
        let valid = true;

        //email/username and password validation
        if(!inputs.email) {
            handleError('Please enter your username or email', 'usernameOremail');
            valid = false;
        } 
        if(!inputs.password) {
            handleError('Please input password', 'password');
            valid = false;
        } 

        if(valid) {
            handleLogin();
        }
    };

    // const login = () => {
    //     setLoading(true);
    //     setTimeout(async() => {
    //         setLoading(false);
    //         let userData = await AsyncStorage.getItem('user');
    //         if (userData) {
    //             userData = JSON.parse(userData);
    //             if (
    //                 (inputs.usernameOremail === userData.username || 
    //                     inputs.usernameOremail === userData.email) && 
    //                 inputs.password == userData.password
    //             ) {
    //                 AsyncStorage.setItem(
    //                     'user', 
    //                     JSON.stringify({...userData, loggedIn : true}),
    //             );
    //             navigation.navigate("Preferences");
    //             } else {
    //                 Alert.alert('Error', 'Invalid details');
    //             }
    //         } else {
    //             Alert.alert('Error', 'User does not exist');
    //         }
    //     }, 2000);
    // };

    // supabase - login
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
                navigation.navigate("Preferences");
            }
        }, 2000);
    };
    
      

    const handleOnChange = (text, input) => {
        setInputs(prevState => ({...prevState, [input] : text}));
    };

    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({...prevState, [input] : errorMessage}));
    };

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
                <View style={onboardingStyle.dotIndicator}>
                    <DotProgress 
                        total={5} current={1}
                        title="Login to Your Account"
                    />
                </View>
                <Button 
                    backgroundColor="#A3C858C9"
                    title="Login" 
                    // onPress={() => navigation.navigate('NetworkPairing')}
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