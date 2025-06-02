import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from '/Users/sabrina/AuraTherm-Aura/aura/screens/splash';
import Onboarding from '/Users/sabrina/AuraTherm-Aura/aura/screens/onboarding';

const Stack = createNativeStackNavigator();

export default function App() {
  <NavigationContainer>
    <StatusBar style = "auto"/>
    <Stack.Navigator>
      <Stack.Screen name = "splash" component = {splash}/>
      <Stack.Screen name = "onboarding" component = {onboarding}/>
    </Stack.Navigator>
  </NavigationContainer>
}