import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import MainScreensStyle from '../../style/MainScreenStyles';
import ControlTab from '../../component/controlTab';
import DataBox from '../../component/energy savings/dataBox';
import SuggestionsBox from '../../component/energy savings/suggestionsBox';

export default function EnergyScreen({ navigation }) {
    const [selectedTab, setSelectedTab] = useState('Weekly');

    return (
    <ScrollView style={MainScreensStyle.container} showsVerticalScrollIndicator={false}>
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

        <View style={styles.suggestionsBoxContainer}>
            <Text style={styles.suggestionsTitle}>Energy Usage Breakdown</Text>

            <View style={styles.suggestionBoxStack}>
                <SuggestionsBox 
                    color="#FFF0D3" 
                    style={styles.suggestionBoxTop} 
                    room="Bedroom"
                    icon="bed-queen-outline"
                    energyValue='48'
                />
                <SuggestionsBox 
                    color="#D9EEFF" 
                    style={styles.suggestionBoxMiddle} 
                    room="Kitchen"
                    icon="fridge-outline"
                    energyValue='20'
                />
            </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    dataBoxContainer: {
        paddingTop: 10,
    },
    suggestionsBoxContainer: {
        paddingTop: 30,
        width: '100%',
    },
    suggestionsTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    },
    suggestionBoxStack: {
        width: '100%',
        marginTop: 10,
        marginBottom: 40,
    },
    suggestionBoxTop: {
        zIndex: 3,
    },
    suggestionBoxMiddle: {
        top: 25,
        zIndex: 2,
    },
    // suggestionBoxBottom: {
    //     top: 50,
    //     zIndex: 1,
    // },
});
