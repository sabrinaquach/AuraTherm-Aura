import React, { useState } from 'react';
import {View, Text, Keyboard, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import onboardingStyle from '../style/onboardingStyle.js';
import Input from '../component/input.js'
import Button from '../component/button.js'
import Loader from '../component/loader.js'
import DotProgress from'../component/dotIndicator.js'

const Login = ({ navigation }) => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const validate = () => {
        Keyboard.dismiss();
        let valid = true;

        //email/username and password validation
        if(!inputs.usernameOremail) {
            handleError('Please enter your username or email', 'usernameOremail');
            valid = false;
        } 
        if(!inputs.password) {
            handleError('Please input password', 'password');
            valid = false;
        } 

        if(valid) {
            login();
        }
    };

    const login = () => {
        setLoading(true);
        setTimeout(async() => {
            setLoading(false);
            let userData = await AsyncStorage.getItem('user');
            if (userData) {
                userData = JSON.parse(userData);
                if (
                    (inputs.usernameOremail === userData.username || 
                        inputs.usernameOremail === userData.email) && 
                    inputs.password == userData.password
                ) {
                    AsyncStorage.setItem(
                        'user', 
                        JSON.stringify({...userData, loggedIn : true}),
                );
                navigation.navigate("Preferences");
                } else {
                    Alert.alert('Error', 'Invalid details');
                }
            } else {
                Alert.alert('Error', 'User does not exist');
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
        <View style={styles.container}>
            <Loader visible={loading} label="Logging Into Your Account..."/>
            <Text style={onboardingStyle.title}>Login</Text>
            <View> 
                <Input
                    label="Username"
                    placeholder='Enter your username or email'
                    placeholderTextColor='gray'
                    error={errors.usernameOremail}
                    onFocus={() => {
                        handleError(null, 'usernameOremail')
                    }}
                    onChangeText={text => handleOnChange(text, 'usernameOremail')}
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
    // dotIndicator: {
    //     top: 615,
    //     position: 'absolute',
    //     bottom: 0,
    //     left: 20,
    //     right: 0,
    // },
});