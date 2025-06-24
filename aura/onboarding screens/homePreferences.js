import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Feather';

import onboardingStyle from '../style/onboardingStyle.js';
import Button from '../component/button.js'
import DotProgress from'../component/dotIndicator.js'
import usePreferences from '../utilties/usePreferences.js';

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
        {key:'60-65', value:'60°F – 65°F (Cool)'},
        {key:'66-70', value:'66°F – 70°F (Mild Cool)'},
        {key:'71-75', value: '71°F – 75°F (Neutral)'},
        {key:'76-80', value: '76°F – 80°F (Warm)'},
    ]
    const celsiusTemp = [
        {key:'16-18', value: '16°C – 18°C (Cool)'},
        {key:'19-21', value: '19°C – 21°C (Mild Cool)'},
        {key:'22-24', value: '22°C – 24°C (Neutral)'},
        {key:'25-27', value: '25°C – 27°C (Warm)'},
    ]

    //slider
    const [Energyvalue, setEnergyValue] = useState(0);
    const EnergyEnumValues = ['Comfort', 'Eco', 'Balanced'];
    const [EnergyIndex, setEnergyIndex] = useState(0);
    const [energyPriority, setEnergyPriority] = useState(EnergyEnumValues[0]);
    
    const handleSliderChange = (val) => {
        setEnergyIndex(val);
        setEnergyPriority(EnergyEnumValues[val]);
    };
    const [occupancyValue, setOccupancyValue] = useState(1);

    //call usePreferences.js - load user preferences
    const {
        occupancySensitivity,
        setOccupancySensitivity,
        updatePreferences,
        loading,
    } = usePreferences();

    
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
                    save="key"
                    inputonboardingStyle={{padding: 1}}
                    arrowicon={<Icon name="chevron-down" size={20} color="#333" />}
                    searchicon={<Icon name="search" size={20} color="#333" paddingRight={5} />}
                      closeicon={<Icon name="x" size={20} color="#333" />}
                />
            </View>
            <View style={onboardingStyle.sliderContainer}>
                <Text style={onboardingStyle.subtitle}>Choose the Setting That Fits You</Text>
                <View style={onboardingStyle.labelsContainer}>
                    {EnergyEnumValues.map((label) => (
                        <Text key={label} style={onboardingStyle.labelText}>{label}</Text>
                    ))}
                </View>
                <Slider 
                    style={{width: '100%', height: 40, position: 'fixed'}}
                    minimumValue={0}
                    maximumValue={2}
                    step={1}
                    value={EnergyIndex}
                    onValueChange={handleSliderChange}
                    minimumTrackTintColor="#D9D9D9"
                    maximumTrackTintColor="#D9D9D9"
                    thumbTintColor="#A3C858C9"
                />
                <Text style={onboardingStyle.text}>Aura adapts your comfort based on your energy priorities — you can always change it later.</Text>
            </View>
            <View style={onboardingStyle.dotIndicator}>
                <DotProgress 
                    total={4} current={1}
                    title="Preferences"
                />
            </View>
            <Button 
                backgroundColor="#A3C858C9"
                title="Pair Device to Network" 
                onPress={async () => {
                    if (!tempUnit || !tempPreferences) {
                        alert("Please select both temperature unit and temperature range.");
                        return;
                      }
                    
                      const energyMap = ['Comfort', 'Eco', 'Balanced'];
                    
                      await updatePreferences({
                        tempUnit,
                        tempRange: tempPreferences,
                        occupancySensitivity: occupancyValue,
                        energyPriority,
                      });

                      console.log({
                        tempRange: tempPreferences,
                        tempUnit,
                        energyPriority,
                      })
                      
                    
                      navigation.navigate('NetworkPairing');r
                  }}
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
})