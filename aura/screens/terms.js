import React from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView} from 'react-native';

const TermsAndConditions = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Terms and Conditions</Text>
                <Text style={styles.content}>
                    Welcome to Aura! Please read these terms carefully
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
};

export default TermsAndConditions;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
    },
});

