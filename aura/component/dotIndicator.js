import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const DotProgress = ({ total, current, title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.dotRow}>
        {Array.from({length: total}).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              current === index && styles.activeDot, 
            ]}
          >
          </View>
        ))}
      </View>
    </View>
  );
};

export default DotProgress;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      width: '100%',
      paddingHorizontal: 20, 
      marginVertical: 40,
      
    },
    dot: {
      width: 8,
      height: 8,
      backgroundColor: '#ccc',
      borderRadius: 5,
    },
    activeDot: {
      backgroundColor: '#A3C858',
      width: 8,
      height: 8,
    },
    textContainer: {
      marginBottom: 10,
    },
    text: {
      color: '#ccc',
      fontSize: 13,
      fontWeight: '500',
    },
    dotRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: 5,
      marginTop: -5,
    },
  });
  