import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Slider from '@react-native-community/slider';

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
        {key:'1', value: '16°C – 18°C (Cool)'},
        {key:'2', value: '19°C – 21°C (Mild Cool)'},
        {key:'3', value: '22°C – 24°C (Neutral)'},
        {key:'4', value: '25°C – 27°C (Warm)'},
    ]

    //slider
    const [value, setValue] = useState(1);
    const labels = ['Comfort', 'Eco', 'Balanced'];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Home</Text>

            <View style={styles.preferencesContainer}>
                <Text style={styles.subtitle}>Temperature Unit Preferences</Text>
                <SelectList 
                    setSelected={(val) => {
                        setTempUnit(val);
                        setTempOptions(val === 'F' ? fahrenheitTemp : celsiusTemp);
                      }}
                      data={temperatureUnit}
                      placeholder="Select Temperature Unit"
                      save="key"
                />
                
                <Text style={styles.subtitle}>Temperature Preferences</Text>
                <SelectList
                    setSelected={setTempPreferences}
                    data={tempOptions}
                    placeholder="Select Temperature Range"
                />
            </View>
            <View style={styles.sliderContainer}>
                <Text style={styles.subtitle}>Choose the Setting That Fits You</Text>
                <View style={styles.labelsContainer}>
                    {labels.map((label) => (
                        <Text style={styles.label}>{label}</Text>
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
                <Text style={styles.text}>Aura adapts your comfort based on your energy priorities — you can always change it later.</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('NetworkPairing')}
                >
                    <Text style={styles.buttonText}>Pair Device to Network</Text>
                </TouchableOpacity>
            </View>
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '500',
        paddingTop: 15,
        paddingBottom: 5,
    },
    preferencesContainer: {
        paddingBottom: 15,
    },
    labelsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: -2,
        paddingHorizontal: 5,
      },
    label: {
        fontSize: 16,
        fontWeight: 500,
        paddingTop: 15,
    },
    text: {
        fontSize: 13,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',  
        alignItems: 'center',   
    },
    button: {
        backgroundColor: '#A3C858C9',
        width: '100%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        borderWidth: 0.2,
      },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    sliderContainer: {
        paddingTop: 40,
    },
})