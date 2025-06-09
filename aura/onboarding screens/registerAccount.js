import React, {useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Input from '../component/input.js'
import Button from '../component/button.js'
import Loader from '../component/loader.js'

const RegisterAccount = ({ navigation }) => {
    //error handling & validation for input boxes
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

        //username and password validation
        if(!inputs.username) {
            handleError('Please input username', 'username');
            valid = false;
        } 
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
            register();
        }
    };

    const register = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);

            try {
                AsyncStorage.setItem("user", JSON.stringify(inputs));
                navigation.navigate('Login');
            } catch (error) {
                Alert.alert('Error', 'Something went wrong');
            }
        }, 2000);
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
        <View style={styles.container}>
            <Loader visible={loading} label="Creating Your Account..."/>
            <Text style={styles.title}>Create An Account</Text>
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
            <View style={styles.radioGroup}>
                <View style={styles.radioButton}>
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
                    <View style={styles.learnContainer}>
                        <Text style={styles.radioLabel}>I accept the terms and privacy policy.</Text>
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
                        <Text style={styles.linkText}>Learn More</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {errors.terms && (
                <Text style={styles.termsError}>{errors.terms}</Text>
            )}
            <Button 
                backgroundColor="#A3C858C9"
                title="Register" 
                onPress={validate}
            />
            <Text 
                style={styles.loginDescription}
                onPress={() => navigation.navigate('Login')}
            >
                Already have an account? Login
            </Text>
        </View>
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
    input: {
        color: 'black',
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D9D9D9',
        padding: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '500',
        paddingBottom: 5,
        paddingTop: 20,
    },
    radioGroup: {
        flexDirection: 'row', 
        alignItems: 'left', 
        marginTop: 20, 
      },
    radioButton: {
        flexDirection: 'row', 
        alignItems: 'center',         
    },
    learnContainer: {
        flexDirection: 'column',
    },
    radioLabel: {
        marginLeft: 8, 
        fontSize: 16,
        color: '#333',
    },
    linkText: {
        marginLeft: 8, 
        fontSize: 16,
        color: '#757575',
    },
    loginDescription: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        bottom: 40,
    },
    termsError: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        paddingLeft: 46,
    },
});