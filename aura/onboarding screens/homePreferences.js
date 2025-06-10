import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Feather';

import onboardingStyle from '../style/onboardingStyle.js';
import Button from '../component/button.js'
import DotProgress from'../component/dotIndicator.js'

const Preferences = ({ navigation }) => {
    //dropdowns
    const [tempUnit, setTempUnit] = useState("");
    const [tempPreferences, setTempPreferences] = useState("");
    const [tempOptions, setTempOptions] = useState("");

    const temperatureUnit = [
        {key:'F', value:'Fahrenheit (°F)'},
        {key:'C', value:'Celsius (°C)'},
    ]
    const fahrenheitTemp = [
        {key:'1', value:'60°F – 65°F (Cool)'},
        {key:'2', value:'66°F – 70°F (Mild Cool)'},
        {key:'3', value: '71°F – 75°F (Neutral)'},
        {key:'4', value: '76°F – 80°F (Warm)'},
    ]
    const celsiusTemp = [
        {key:'a', value: '16°C – 18°C (Cool)'},
        {key:'b', value: '19°C – 21°C (Mild Cool)'},
        {key:'c', value: '22°C – 24°C (Neutral)'},
        {key:'d', value: '25°C – 27°C (Warm)'},
    ]

    //slider
    const [value, setValue] = useState(1);
    const labels = ['Comfort', 'Eco', 'Balanced'];

    return (
        <View style={styles.container}>
            <Text style={onboardingStyle.title}>Your Home</Text>

            <View style={onboardingStyle.preferencesContainer}>
                <Text style={onboardingStyle.subtitle}>Temperature Unit Preferences</Text>
                <SelectList 
                    setSelected={(val) => {
                        setTempUnit(val);
                        setTempOptions(val === 'F' ? fahrenheitTemp : celsiusTemp);
                      }}
                      data={temperatureUnit}
                      placeholder="Select Temperature Unit"
                      save="key"
                      inputonboardingStyle={{padding: 1}}
                      arrowicon={<Icon name="chevron-down" size={20} color="#333" />}
                      searchicon={<Icon name="search" size={20} color="#333" paddingRight={5} />}
                      closeicon={<Icon name="x" size={20} color="#333" />}
                />
                
                <Text style={onboardingStyle.subtitle}>Temperature Preferences</Text>
                <SelectList
                    setSelected={setTempPreferences}
                    data={tempOptions}
                    placeholder="Select Temperature Range"
                    inputonboardingStyle={{padding: 1}}
                    arrowicon={<Icon name="chevron-down" size={20} color="#333" />}
                    searchicon={<Icon name="search" size={20} color="#333" paddingRight={5} />}
                      closeicon={<Icon name="x" size={20} color="#333" />}
                />
            </View>
            <View style={onboardingStyle.sliderContainer}>
                <Text style={onboardingStyle.subtitle}>Choose the Setting That Fits You</Text>
                <View style={onboardingStyle.labelsContainer}>
                    {labels.map((label) => (
                        <Text key={label} style={onboardingStyle.labelText}>{label}</Text>
                    ))}
                </View>
                <Slider 
                    style={{width: '100%', height: 40, position: 'fixed'}}
                    minimumValue={0}
                    maximumValue={2}
                    step={1}
                    value={value}
                    onValueChange={setValue}
                    minimumTrackTintColor="#D9D9D9"
                    maximumTrackTintColor="#D9D9D9"
                    thumbTintColor="#A3C858C9"
                />
                <Text style={onboardingStyle.text}>Aura adapts your comfort based on your energy priorities — you can always change it later.</Text>
            </View>
            <View style={onboardingStyle.dotIndicator}>
                <DotProgress 
                    total={5} current={2}
                    title="Preferences"
                />
            </View>
            <Button 
                backgroundColor="#A3C858C9"
                title="Pair Device to Network" 
                onPress={() => navigation.navigate('NetworkPairing')}
            />
        </View>
    )
}

export default Preferences;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 20, 
        backgroundColor: '#fff',
    },
    // title: {
    //     fontSize: 28,
    //     fontWeight: 'bold',
    // },
    // subtitle: {
    //     fontSize: 20,
    //     fontWeight: '500',
    //     paddingTop: 15,
    //     paddingBottom: 5,
    // },
    // preferencesContainer: {
    //     paddingBottom: 15,
    // },
    // labelsContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     marginBottom: -2,
    //     paddingHorizontal: 5,
    //   },
    // labelText: {
    //     fontSize: 16,
    //     fontWeight: 500,
    //     paddingTop: 15,
    // },
    // text: {
    //     fontSize: 13,
    // },
    // sliderContainer: {
    //     paddingTop: 40,
    // },
    // dotIndicator: {
    //     top: 95,
    // },
})