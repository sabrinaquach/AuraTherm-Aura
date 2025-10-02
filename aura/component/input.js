import React, { useState } from "react";
import {View, Text, StyleSheet, TextInput} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const Input = ({
    label,
    error,
    password,
    onFocus = () => {},
    ...props
}) => {
    const[isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);
    
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.inputContainer, {borderColor: error ? 'red' : isFocused ? '#D9D9D9' : '#D9D9D9'}]}>
                <TextInput 
                    style={styles.input}
                    {...props} 
                    secureTextEntry={hidePassword}
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    // onChangeText={text => handleOnChange(text, 'username')}
                    error="Input username"
                />
                {password && (
                    <Feather 
                        style={styles.icon}
                        name={hidePassword ? 'eye' : 'eye-off'} 
                        onPress={() => setHidePassword(!hidePassword)}
                    />
                )}
            </View>
            {error && (
                <Text style={styles.errorMessage}>{error}</Text>
            )}
        </View>
    )
}

export default Input;

const styles = StyleSheet.create ({ 
    label: {
        fontSize: 18,
        fontWeight: '500',
        paddingBottom: 5,
        paddingTop: 20,
    },
    input: {
        flex: 1,
    },
    inputContainer: {
        color: 'black',
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D9D9D9',
        flexDirection: "row",
        paddingHorizontal: 10, 
    }, 
    errorMessage: {
        color: 'red',
        fontSize: 12,
        marginTop: 7,
    },
    icon: {
        fontSize: 18,
        color: 'black',
        alignSelf: 'center',
        paddingLeft: 20,
    },
});