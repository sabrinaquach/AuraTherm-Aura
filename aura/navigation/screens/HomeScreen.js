import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MainScreensStyle from '../../style/MainScreenStyles';

export default function HomeScreen ({ navigation }) {
    return (
        <View style={MainScreensStyle.container}>
            <Text 
                style={MainScreensStyle.title}
                onPress={() => navigation.navigate('Home')}
            >
            Aura</Text>
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