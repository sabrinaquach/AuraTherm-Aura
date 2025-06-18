import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import HomeScreen from '../navigation/screens/HomeScreen.js';
import HistoryScreen from '../navigation/screens/HistoryScreen.js';
import EnergyScreen from '../navigation/screens/EnergyScreen.js';
import SettingsScreen from '../navigation/screens/SettingsScreen.js';
import SettingsContainer from './screens/settings screens/SettingsContainer.js';

const homeName = 'Home';
const historyName = 'History';
const energyName = 'Energy';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        // <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route}) => ({
                    tabBarIcon:({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home'
                        } else if (rn === historyName) {
                            iconName = focused ? 'clock' : 'clock'
                        } else if (rn === energyName) {
                            iconName = focused ? 'zap' : 'zap'
                        } else if (rn === settingsName) {
                            iconName = focused ? 'settings' : 'settings'
                        }

                        return <Icon name={iconName} size={size} color={color}/>
                    },

                    tabBarActiveTintColor: '#A3C858',
                    tabBarInactiveTintColor: 'black',

                    tabBarStyle: {
                        borderTopWidth: 0,
                        strokeWidth: 2,
                        padding: 0,
                    },
                    tabBarLabelStyle: {
                        padding: 2,
                    },
                })}
            >
                <Tab.Screen name={homeName} component={HomeScreen} options={{ headerShown: false }}/>
                <Tab.Screen name={historyName} component={HistoryScreen} options={{ headerShown: false }}/>
                <Tab.Screen name={energyName} component={EnergyScreen} options={{ headerShown: false }}/>
                <Tab.Screen name={settingsName} component={SettingsContainer} options={{ headerShown: false }} />
            </Tab.Navigator>
        // </NavigationContainer>
    );
}
