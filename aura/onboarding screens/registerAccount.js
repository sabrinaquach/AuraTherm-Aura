import React, {useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Keyboard, Alert, TouchableWithoutFeedback } from 'react-native';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import onboardingStyle from '../style/onboardingStyle.js';
import Input from '../component/input.js'
import Button from '../component/button.js'
import Loader from '../component/loader.js'
import DotProgress from'../component/dotIndicator.js'
import supabase from '../auth/client.js';

const RegisterAccount = ({ navigation }) => {
    //error handling & validation for input boxes
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        Keyboard.dismiss();
        let valid = true;

        //password validation
        if(!inputs.password) {
            handleError('Please input password', 'password');
            valid = false;
        } else if(inputs.password.length < 8) {
            handleError('Minimum password length of 8 characters', 'password');
            valid = false;
        }

        //email validation
        if(!inputs.email) {
            handleError('Please input email', 'email');
            valid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please input valid email', 'email');
            valid = false;
        }

        //terms validation
        if(!isSelected) {
            handleError('Please accept the terms', 'terms');
            valid = false;
        } else {
            handleError(null, 'terms');
        }

        if(valid) {
            handleSignup();
        }
    };

    //supabase - signup
    const handleSignup = async () => {
        setLoading(true);
    
        setTimeout(async () => {
            const { error } = await supabase.auth.signUp({
                email: inputs.email,
                password: inputs.password,
            });

            setLoading(false);
    
            if (error) {
                Alert.alert('Error', error.message);
            } else {
                // Alert.alert('Success', 'Check your email to confirm signup.');
                navigation.navigate("Welcome");
            }
        }, 1500);
    };
    
    
    const handleOnChange = (text, input) => {
        setInputs(prevState => ({...prevState, [input] : text}));
    };

    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({...prevState, [input] : errorMessage}));
    };

    //terms and condition radio button
    const [isSelected, setIsSelected] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Loader visible={loading} label="Creating Your Account..."/>
                <Text style={onboardingStyle.title}>Create An Account</Text>
                <View> 
                    <Input
                        label="Email"
                        placeholder='Enter your email address'
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
                <View style={onboardingStyle.radioGroup}>
                    <View style={onboardingStyle.radioButton}>
                        <RadioButton
                            value={isSelected}
                            status={isSelected ? 'checked' : 'unchecked'}
                            onPress={() => {
                                const nextValue = !isSelected;
                                setIsSelected(nextValue);
                                if (nextValue) {
                                handleError(null, 'terms'); 
                                }
                            }}
                            color="green"
                            borderWidth="1"
                        />
                        <View style={onboardingStyle.learnContainer}>
                            <Text style={onboardingStyle.radioLabel}>I accept the terms and privacy policy.</Text>
                            <TouchableOpacity 
                                onPress={() => {
                                    navigation.navigate('Terms', 
                                    {
                                        onAgree: () => {
                                            setIsSelected(true);
                                            handleError(null, 'terms');
                                        },
                                        onReject: () => setIsSelected(false),
                                    })
                                }}
                            >
                            <Text style={onboardingStyle.linkText}>Learn More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {errors.terms && (
                    <Text style={onboardingStyle.termsError}>{errors.terms}</Text>
                )}
                <View style={onboardingStyle.dotIndicator}>
                    <DotProgress 
                        total={5} current={1}
                        title="Set Up Your Account"
                    />
                </View>
                <Button 
                    backgroundColor="#A3C858C9"
                    title="Register" 
                    onPress={validate}
                />
                <Text 
                    style={onboardingStyle.loginDescription}
                    onPress={() => navigation.navigate('Login')}
                >
                    Already have an account? Login
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}
export default RegisterAccount;

const styles = StyleSheet.create ({ 
    container: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 20, 
        backgroundColor: '#fff',
    },
});