import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const Button = ({title, navigation, backgroundColor="#000", onPress = () => {}}) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity 
                activeOpacity={0.7}
                onPress={onPress}
                style={[styles.button, { backgroundColor }]}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Button;

const styles = StyleSheet.create ({ 
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',  
        alignItems: 'center',   
        paddingHorizontal: 10, 
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 55,
        borderWidth: 0.2,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
});