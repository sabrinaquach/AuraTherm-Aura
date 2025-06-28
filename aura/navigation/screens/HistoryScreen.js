import * as React from 'react';
import { View, Text } from 'react-native';

import MainScreensStyle from '../../style/MainScreenStyles';
import ControlTab from '../../component/controlTab';

export default function HistoryScreen ({ navigation }) {
    return (
        <View style={MainScreensStyle.container}>
            <Text 
                style={MainScreensStyle.title}
                onPress={() => navigation.navigate('Home')}
            >
            History</Text>
            <ControlTab 
                labelOne="Today"
                labelTwo="Yesterday"
            />
        </View>
    );
}
