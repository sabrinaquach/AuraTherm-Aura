import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from './aura/screens/splash.js';
import Onboarding from './aura/screens/onboarding.js';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <StatusBar style = "auto"/>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={Splash}/>
                <Stack.Screen name="Onboarding" component={Onboarding}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
registerRootComponent(App);
