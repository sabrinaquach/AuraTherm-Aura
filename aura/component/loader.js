import React from "react";
import {View, Text, StyleSheet, useWindowDimensions, ActivityIndicator} from 'react-native';

const Loader = ({visible = false, label}) => {
    const {height, width} = useWindowDimensions();
    
    return (
        visible && (
            <View style={[styles.container, {height, width}]}>
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#A3C858C9"/>
                    <Text style={styles.text}>{label}</Text>
                </View>
            </View>
        )
    );
};

export default Loader;

const styles = StyleSheet.create ({ 
    container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
    },
    loader: {
        height: 70,
        backgroundColor: '#fff',
        marginHorizontal: 50,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    text: {
        paddingLeft: 8,
    },
});