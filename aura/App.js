import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aura</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
  }
});
