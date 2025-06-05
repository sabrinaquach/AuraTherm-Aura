import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';

const Splash = ({ navigation }) => {
  useEffect (() => {
    const timer = setTimeout (() => {
        navigation.replace('Welcome');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigation]);

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