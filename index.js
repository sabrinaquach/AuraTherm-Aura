import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { LinearGradient} from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from './aura/screens/splash.js';
import Welcome from './aura/screens/welcome.js';
import Account from './aura/screens/registerAccount.js';
import Preferences from './aura/screens/homePreferences.js';
import Onboarding from './aura/screens/onboarding.js';
import TermsAndConditions from './aura/screens/terms.js';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            {/* <StatusBar style = "auto"/> */}
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
                <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
                <Stack.Screen name="Account" component={Account} options={{ headerShown: false }}/>
                <Stack.Screen name="Preferences" component={Preferences} options={{ headerShown: false }}/>
                <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }}/>
                <Stack.Screen name="Terms" component={TermsAndConditions} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
registerRootComponent(App);
