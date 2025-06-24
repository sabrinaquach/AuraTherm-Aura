import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { SelectList } from 'react-native-dropdown-select-list';

import MainScreensStyle from '../../../style/MainScreenStyles';

export default function MainPreferences ({ navigation }) {
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
    const [Occupancyvalue, setOccupancyValue] = useState(1);
    const [Energyvalue, setEnergyValue] = useState(1);
    const Occupancylabels = ['Low', 'High'];
    const Energylabels = ['Comfort', 'Eco', 'Balanced'];

    useEffect (() => {
        const loadUserData = async () => {
            const { data } = await supabase.auth.getSession();
            const user = data?.session?.user;
            const tempUnit = user?.user_metadata?.username;
            const tempRange = user?.user_metadata?.email;
            const occupancySensitivity = user?.user_metadata?.password;
            const energyPriority = user?.user_metadata?.password;

            if (username) {
                setUsername(username);
                setEmail(email);
                setPassword(password);
            }
        };
        loadUserData();
    }, []);
    
    return (
        <ScrollView style={MainScreensStyle.ScrollView} bounces={false}>
        <View style={MainScreensStyle.container}>
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
                      placeholder="Select Temperature Unit"
                      save="key"
                      inputMainScreensStyle={{padding: 1}}
                      arrowicon={<Icon name="chevron-down" size={20} color="#333" />}
                      searchicon={<Icon name="search" size={20} color="#333" paddingRight={5} />}
                      closeicon={<Icon name="x" size={20} color="#333" />}
                />
                
                <Text style={[MainScreensStyle.subtitle, {paddingBottom: 5, paddingTop: 15}]}>Temperature Preferences</Text>
                <SelectList
                    setSelected={setTempPreferences}
                    data={tempOptions}
                    placeholder="Select Temperature Range"
                    inputMainScreensStyle={{padding: 1}}
                    arrowicon={<Icon name="chevron-down" size={20} color="#333" />}
                    searchicon={<Icon name="search" size={20} color="#333" paddingRight={5} />}
                      closeicon={<Icon name="x" size={20} color="#333" />}
                />
            </View>
            <View style={MainScreensStyle.sliderContainer}>
                <Text style={[MainScreensStyle.subtitle, {paddingBottom: 2}]}>Occupancy Sensitivity</Text>
                <View style={MainScreensStyle.labelsContainer}>
                    {Occupancylabels.map((label) => (
                        <Text key={label} style={MainScreensStyle.labelText}>{label}</Text>
                    ))}
                </View>
                <Slider 
                    style={{width: '100%', height: 40, position: 'fixed'}}
                    minimumValue={0}
                    maximumValue={2}
                    step={0.1}
                    value={Occupancyvalue}
                    onValueChange={setOccupancyValue}
                    minimumTrackTintColor="#D9D9D9"
                    maximumTrackTintColor="#D9D9D9"
                    thumbTintColor="#A3C858C9"
                />
                <Text style={MainScreensStyle.text}>Set how sensitive AuraTherm is to motion—higher levels may change temperature more often.</Text>
            </View>
            <View style={MainScreensStyle.secondSliderContainer}>
            <Text style={[MainScreensStyle.subtitle, {paddingBottom: 2}]}>Energy Priority</Text>
                <View style={MainScreensStyle.labelsContainer}>
                    {Energylabels.map((label) => (
                        <Text key={label} style={MainScreensStyle.labelText}>{label}</Text>
                    ))}
                </View>
                <Slider 
                    style={{width: '100%', height: 40, position: 'fixed'}}
                    minimumValue={0}
                    maximumValue={2}
                    step={1}
                    value={Energyvalue}
                    onValueChange={setEnergyValue}
                    minimumTrackTintColor="#D9D9D9"
                    maximumTrackTintColor="#D9D9D9"
                    thumbTintColor="#A3C858C9"
                />
                <Text style={MainScreensStyle.text}>Aura adapts to your comfort.</Text>
            </View>
        </View>
        </ScrollView>
    );
}