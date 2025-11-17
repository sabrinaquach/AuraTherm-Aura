import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MainScreensStyle from '../../style/MainScreenStyles';
import ControlTab from '../../component/controlTab';
import DataBox from '../../component/energy savings/dataBox';

export default function EnergyScreen({ navigation }) {
    const [selectedTab, setSelectedTab] = useState('Weekly');

    return (
        <View style={MainScreensStyle.container}>
            <Text style={MainScreensStyle.title}>Energy</Text>

            <ControlTab
                labelOne="Weekly"
                labelTwo="Monthly"
                selected={selectedTab}
                onSelect={setSelectedTab} 
            />

            <View style={styles.dataBoxContainer}>
                <DataBox mode={selectedTab} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dataBoxContainer: { 
        paddingTop: 10 
    },
});
