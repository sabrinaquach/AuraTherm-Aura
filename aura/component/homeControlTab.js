import React from 'react';
import { View, StyleSheet } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

export default function HomeControlTab({ values, selectedIndex, onSelect }) {

    return (
        <View>
            <SegmentedControlTab
                values={values}
                selectedIndex={selectedIndex}
                onTabPress={onSelect}
                tabStyle={styles.tabStyle}
                activeTabStyle={styles.activeTabStyle}
                tabsContainerStyle={styles.tabsContainerStyle}
                tabTextStyle={styles.tabTextStyle}
                activeTabTextStyle={styles.activeTabTextStyle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    tabsContainerStyle: {
      backgroundColor: '#f1f1f1', 
      borderRadius: 5,
      padding: 5,
    },
    tabStyle: {
      borderWidth: 0,
      backgroundColor: '#f1f1f1',
      borderRadius: 5,
      paddingVertical: 10,
      borderWidth: 0,        
      borderColor: 'transparent', 
      shadowColor: 'transparent', 
      elevation: 0,          
    },
    activeTabStyle: {
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 0,        
      borderColor: 'transparent', 
      shadowColor: 'transparent', 
      elevation: 0,          
    },
    tabTextStyle: {
      color: '#000',
      fontWeight: '500',
      fontSize: 16,
    },
    activeTabTextStyle: {
      color: '#000',
      fontWeight: '700',
      fontSize: 16,
    },
  });
  
