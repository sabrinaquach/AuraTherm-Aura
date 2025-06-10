import { registerRootComponent } from 'expo';
import App from './App';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from './aura/onboarding screens/splash.js';
import Welcome from './aura/onboarding screens/welcome.js';
import RegisterAccount from './aura/onboarding screens/registerAccount.js';
import TermsAndConditions from './aura/onboarding screens/terms.js';
import Login from './aura/onboarding screens/login.js';
import Preferences from './aura/onboarding screens/homePreferences.js';
import NetworkPairing from './aura/onboarding screens/networkPairing.js';
import Final from './aura/onboarding screens/final.js';
import MainContainer from './aura/navigation/MainContainer.js';

// import Onboarding from './aura/onboarding screens/onboardingIndex.js';

const Stack = createNativeStackNavigator();

export default function OnboardingIndex() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
                <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
                <Stack.Screen name="RegisterAccount" component={RegisterAccount} options={{ headerShown: false }}/>
                <Stack.Screen name="Terms" component={TermsAndConditions} options={{ headerShown: false }}/>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name="Preferences" component={Preferences} options={{ headerShown: false }}/>
                <Stack.Screen name="NetworkPairing" component={NetworkPairing} options={{ headerShown: false }}/>
                <Stack.Screen name="Final" component={Final} options={{ headerShown: false }}/>
                <Stack.Screen name="MainScreens" component={MainContainer} options={{ headerShown: false }}/>

                {/* <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }}/> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
registerRootComponent(App);