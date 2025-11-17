import React, {useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Keyboard, Alert, TouchableWithoutFeedback } from 'react-native';
import { RadioButton } from 'react-native-paper';

import onboardingStyle from '../style/onboardingStyle.js';
import Input from '../component/input.js'
import Button from '../component/button.js'
import Loader from '../component/loader.js'
import supabase from '../auth/client.js';
import useValidation from '../utilties/useSignupValidation.js';

const RegisterAccount = ({ navigation }) => {
    //supabase - signup
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        setLoading(true);
    
        setTimeout(async () => {
            const { error } = await supabase.auth.signUp({
                email: inputs.email,
                password: inputs.password,
                options: {
                    data: {
                      username: inputs.username,
                    },
                  },
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

    //call validation.js - ensure user enters inputs
    const {
        inputs,
        errors,
        isSelected,
        setIsSelected,
        handleOnChange,
        handleError,
        validate,
    } = useValidation(handleSignup);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Loader visible={loading} label="Creating Your Account..."/>
                <Text style={onboardingStyle.title}>Create An Account</Text>
                <View>
                    <Input
                        label="Username"
                        placeholder='Enter your username'
                        placeholderTextColor='gray'
                        error={errors.username}
                        onFocus={() => {
                            handleError(null, 'username')
                        }}
                        onChangeText={text => handleOnChange(text, 'username')}

                    /> 
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