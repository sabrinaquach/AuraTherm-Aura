import * as React from 'react';
import { View, Text } from 'react-native';

import MainScreensStyle from '../styles/MainScreenStyles';

export default function HistoryScreen ({ navigation }) {
    return (
        <View style={MainScreensStyle.container}>
            <Text 
                style={MainScreensStyle.title}
                onPress={() => navigation.navigate('Home')}
            >
            History</Text>
        </View>
    );
}
