import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '../SettingsScreen';
import AccountInfo from '../settings screens/AccountInfo';
import EditAccountInfo from '../settings screens/EditAccountInfo';
import MainPreferences from '../settings screens/Preferences';

const Stack = createNativeStackNavigator();

export default function SettingsContainer() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="SettingsMain" component={SettingsScreen} />
      <Stack.Screen name="AccountInfo" component={AccountInfo} />
      <Stack.Screen name="EditAccountInfo" component={EditAccountInfo} />
      <Stack.Screen name="MainPreferences" component={MainPreferences} />
    </Stack.Navigator>
  );
}
