import { registerRootComponent } from 'expo';
import App from './App';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import useThermostatStatus from './aura/utilties/useThermostatStatus';
import ThermostatContext from './aura/context/ThermostatContext';

import Splash from './aura/onboarding/splash.js';
import Welcome from './aura/onboarding/welcome.js';
import RegisterAccount from './aura/onboarding/registerAccount.js';
import TermsAndConditions from './aura/onboarding/terms.js';
import Login from './aura/onboarding/login.js';
import Preferences from './aura/onboarding/homePreferences.js';
import NetworkPairing from './aura/onboarding/networkPairing.js';
import Final from './aura/onboarding/final.js';
import MainContainer from './aura/navigation/MainContainer.js';
import AccountInfo from './aura/navigation/screens/settings screens/AccountInfo';
import EditAccountInfo from './aura/navigation/screens/settings screens/EditAccountInfo';

const Stack = createNativeStackNavigator();

export default function OnboardingIndex() {

    // 🔥 Mount thermostat hook ONCE globally
    const thermo = useThermostatStatus();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <ThermostatContext.Provider value={thermo}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
                    <Stack.Screen name="Splash" component={Splash} />
                    <Stack.Screen name="Welcome" component={Welcome} />
                    <Stack.Screen name="RegisterAccount" component={RegisterAccount} />
                    <Stack.Screen name="Terms" component={TermsAndConditions} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Preferences" component={Preferences} />
                    <Stack.Screen name="NetworkPairing" component={NetworkPairing} />
                    <Stack.Screen name="Final" component={Final} />
                    <Stack.Screen name="MainScreens" component={MainContainer} />
                    <Stack.Screen name="AccountInfo" component={AccountInfo} />
                    <Stack.Screen name="EditAccountInfo" component={EditAccountInfo} />
                </Stack.Navigator>
                <Toast />
            </NavigationContainer>
        </ThermostatContext.Provider>
        </GestureHandlerRootView>
    );
}

registerRootComponent(App);
