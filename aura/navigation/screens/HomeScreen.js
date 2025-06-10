import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MainScreensStyle from '../styles/MainScreenStyles';

export default function HomeScreen ({ navigation }) {
    return (
        <View style={MainScreensStyle.container}>
            <Text 
                style={MainScreensStyle.title}
                onPress={() => alert('This is the "Home" Screen.')}
            >
            Home</Text>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 20, 
        backgroundColor: '#fff',
    },
});