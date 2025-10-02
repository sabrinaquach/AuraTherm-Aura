import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import placeholder from '../../assets/blank-profile-picture-973460_1280.png'

export default function Avatar ({ 
    uri, 
    style, 
    imgStyle, 
    onPress, 
    onButtonPress, 
    aviOnly = false, 
    ...props 
}) {
    return (
        <View 
            style={[styles.container]}
            {...props}
        >
            <Image 
                source={uri ? { uri } : placeholder}
                style={[
                    styles.image,
                    aviOnly && { height: 35, width: 35, borderWidth: 0 },
                    imgStyle,
                ]}
            />

            {!aviOnly && (
                <TouchableOpacity style={styles.editButton} onPress={onButtonPress}>
                    <Feather 
                        style={styles.icon}
                        name="plus"
                        size={30}
                        color="#A3C858"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        position: 'relative',   
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: 75,
        width: 120,
        height: 120, 
        borderWidth: 1,
        borderColor: '#EDEDED',
    },
    editButton: {
        left: 85,
        bottom: 5,
        backgroundColor: '#EDEDED',
        width: 40,
        height: 40,
        borderRadius: 80,
        borderWidth: 1,
        borderColor: 'white',
        position: 'absolute'
    },
    icon: {
        left: 4.5,
        top: 4.5,
    },
});