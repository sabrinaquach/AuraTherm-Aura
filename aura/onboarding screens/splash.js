import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../auth/client';


const Splash = ({ navigation }) => {
  useEffect(() => {
    const checkStatus = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Splash delay

      const { data: { session } } = await supabase.auth.getSession();
      const onboardingComplete = await AsyncStorage.getItem('onboardingComplete');

      if (session) {
        // User is logged in
        if (onboardingComplete === 'true') {
          navigation.replace('MainScreens');
        } else {
          navigation.replace('Welcome');
        }
      } else {
        // User not logged in
        navigation.replace('Login');
      }
    };

    checkStatus();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aura</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    display: 'flex',
    width: 402,
    height: 874,
    paddingTop: 375,
    paddingRight:38,
    paddingBottom: 423,
    paddingLeft: 37,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
  }
});