import React, {useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Input from '../component/input.js'
import Button from '../component/button.js'

const Account = ({ navigation }) => {
    //error handling for input boxes
    const [isFocused, setIsFocused] = useState(false);

    //terms and condition radio button
    const [isSelected, setIsSelected] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create An Account</Text>
            <View> 
                <Input
                    label="Username"
                    placeholder='Enter your username'
                    placeholderTextColor='gray'
                />
                <Input
                    label="Email"
                    placeholder='Enter your email address'
                    placeholderTextColor='gray'
                />
                <Input
                    label="Password"
                    placeholder='Enter a password that is at least 8 characters'
                    placeholderTextColor='gray'
                    password
                />
            </View>
            <View style={styles.radioGroup}>
                <View style={styles.radioButton}>
                    <RadioButton
                        value={isSelected}
                        status={isSelected ? 'checked' : 'unchecked'}
                        onPress={() => setIsSelected(!isSelected)}
                        color="green"
                        borderWidth="1"
                    />
                    <View style={styles.learnContainer}>
                        <Text style={styles.radioLabel}>I accept the terms and privacy policy.</Text>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Terms', 
                                {
                                    onAgree: () => setIsSelected(true),
                                    onReject: () => setIsSelected(false),
                                }
                            )}
                        >
                            <Text style={styles.linkText}>Learn More</Text>
                        </TouchableOpacity>
                </View>
                </View>
            </View>
            <Button title="Start Setting My Preferences"/>
            <Text 
                style={styles.loginDescription}
                onPress={() => navigation.navigate('Login')}
            >
                Already have an account? Login
            </Text>
        </View>
    )
}
export default Account;

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
});