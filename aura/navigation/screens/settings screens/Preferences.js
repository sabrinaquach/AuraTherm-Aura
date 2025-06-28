import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Feather';
import { SelectList } from 'react-native-dropdown-select-list';
import Toast from 'react-native-toast-message';

import MainScreensStyle from '../../../style/MainScreenStyles';
import usePreferences from '../../../utilties/usePreferences';
import Button from '../../../component/button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MainPreferences ({ navigation }) {
    //call usePreferences.js - load user preferences
    const {
        updatePreferences,
        tempRange,
        tempUnit: savedTempUnit,
        energyPriority: savedEnergyPriority,
        occupancySensitivity,
    } = usePreferences();

    //dropdowns
    const [tempUnit, setTempUnit] = useState(savedTempUnit || '');
    const [tempPreferences, setTempPreferences] = useState(tempRange || '');
    const [tempOptions, setTempOptions] = useState([]);

    //display set preferences for dropdowns
    useEffect(() => {
        if (savedTempUnit) {
            setTempUnit(savedTempUnit);
            setTempOptions(savedTempUnit === 'F' ? fahrenheitTemp : celsiusTemp);
        }
    
        if (tempRange) {
            setTempPreferences(tempRange);
        }
    }, [savedTempUnit, tempRange]);    
    
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
    const [energyPriority, setEnergyPriority] = useState('');
    const [energyIndex, setEnergyIndex] = useState(0);

    const occupancyLabels = ['Low', 'High'];
    
    const handleSliderChange = (val) => {
        setEnergyIndex(val);
        setEnergyPriority(EnergyEnumValues[val]);
    };
    const [occupancyValue, setOccupancyValue] = useState(1);

    //display set preferences for sliders
    useEffect(() => {
        if (occupancySensitivity !== '') {
            const val = parseFloat(occupancySensitivity);
            if (!isNaN(val)) setOccupancyValue(val);
        }
      
        if (savedEnergyPriority) {
            const index = EnergyEnumValues.indexOf(savedEnergyPriority);
            if (index !== -1) {
                setEnergyIndex(index);
                setEnergyPriority(savedEnergyPriority);
            }
        }
      }, [occupancySensitivity, savedEnergyPriority]);
    
    return (
        <SafeAreaView style={MainScreensStyle.SafeArea}>
            <ScrollView style={MainScreensStyle.ScrollView} bounces={false}>
            <View >
                <View style={MainScreensStyle.headerContainer}>
                    <TouchableOpacity 
                        style={MainScreensStyle.backButton}
                        onPress={() => navigation.navigate('SettingsMain')}
                    >
                        <Icon 
                            name="chevron-left"
                            size="30"
                        />
                    </TouchableOpacity>
                    <Text style={MainScreensStyle.editAccountTitle}>Preferences</Text>
                </View>
                <View style={MainScreensStyle.preferencesContainer}>
                    <Text style={[MainScreensStyle.subtitle, {paddingBottom: 5, paddingTop: 20}]}>Temperature Unit Preferences</Text>
                    <SelectList 
                        setSelected={(val) => {
                            setTempUnit(val);
                            setTempOptions(val === 'F' ? fahrenheitTemp : celsiusTemp);
                        }}
                        data={temperatureUnit}
                        defaultOption={{ key: tempUnit, value: tempUnit === 'F' ? 'Fahrenheit (°F)' : 'Celsius (°C)' }}
                        placeholder="Select Temperature Unit"
                        save="key"
                        inputMainScreensStyle={{padding: 1}}
                        arrowicon={<Icon name="chevron-down" size={20} color="#333" />}
                        searchicon={<Icon name="search" size={20} color="#333" paddingRight={5} />}
                        closeicon={<Icon name="x" size={20} color="#333" />}
                    />
                    
                    <Text style={[MainScreensStyle.subtitle, {paddingBottom: 5, paddingTop: 15}]}>Temperature Preferences</Text>
                    {tempOptions.length > 0 && (
                        <SelectList
                            setSelected={setTempPreferences}
                            data={tempOptions}
                            defaultOption={
                                tempOptions.find(opt => opt.key === tempPreferences) || {
                                key: tempPreferences,
                                value: tempPreferences,
                                }
                            }                          
                            placeholder="Select Temperature Range"
                            save="key"
                            inputMainScreensStyle={{padding: 1}}
                            arrowicon={<Icon name="chevron-down" size={20} color="#333" />}
                            searchicon={<Icon name="search" size={20} color="#333" paddingRight={5} />}
                            closeicon={<Icon name="x" size={20} color="#333" />}
                        />
                    )}
                </View>
                <View style={MainScreensStyle.sliderContainer}>
                    <View style={MainScreensStyle.occupancyContainer}>
                        <Text style={[MainScreensStyle.occupancyTitle, {paddingBottom: 2}]}>Occupancy Sensitivity </Text>
                        <Text style={[MainScreensStyle.sensitivityNumber, {paddingBottom: 2}]}>{occupancyValue.toFixed(1)}</Text>
                    </View>
                    
                    <View style={MainScreensStyle.labelsContainer}>
                        {occupancyLabels.map((label) => (
                            <Text key={label} style={MainScreensStyle.labelText}>{label}</Text>
                        ))}
                    </View>
                    {/* <Text style={{ textAlign: 'center' }}>
                        Current Sensitivity: {occupancyValue.toFixed(1)}
                    </Text> */}
                    <Slider 
                        style={{width: '100%', height: 40, position: 'fixed'}}
                        minimumValue={0}
                        maximumValue={2}
                        step={0.1}
                        value={occupancyValue}
                        onValueChange={setOccupancyValue}
                        minimumTrackTintColor="#D9D9D9"
                        maximumTrackTintColor="#D9D9D9"
                        thumbTintColor="#A3C858C9"
                    />
                    <Text style={MainScreensStyle.text}>Set how sensitive AuraTherm is to motion.</Text>
                </View>
                <View style={MainScreensStyle.secondSliderContainer}>
                <Text style={[MainScreensStyle.subtitle, {paddingBottom: 2}]}>Energy Priority</Text>
                    <View style={MainScreensStyle.labelsContainer}>
                        {EnergyEnumValues.map((label) => (
                            <Text key={label} style={MainScreensStyle.labelText}>{label}</Text>
                        ))}
                    </View>
                    <Slider 
                        style={{width: '100%', height: 40, position: 'fixed'}}
                        minimumValue={0}
                        maximumValue={2}
                        step={1}
                        value={energyIndex}
                        onValueChange={handleSliderChange}
                        minimumTrackTintColor="#D9D9D9"
                        maximumTrackTintColor="#D9D9D9"
                        thumbTintColor="#A3C858C9"
                    />
                    <Text style={MainScreensStyle.text}>How Aura adapts to your comfort.</Text>
                </View>
                <View style={{ marginVertical: 140, alignItems: 'center' }}>
                    <Button 
                    backgroundColor="#A3C858C9"
                    title="Save" 
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
                        
                        Toast.show({
                            type: 'success',
                            text1: 'Preferences Saved!',
                            position: 'top',
                            topOffset: 65,
                            visibilityTime: 2000,
                        });

                        navigation.navigate('SettingsMain');
                    }}
                    
                />
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}
