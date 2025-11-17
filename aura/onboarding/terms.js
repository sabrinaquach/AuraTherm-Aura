import React from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

import Button from '../component/button.js'

const TermsAndConditions = ({ navigation, route }) => {
    const acceptedTerm = () => {
        if (route.params?.onAgree) {
            route.params.onAgree(); 
        }
            navigation.goBack();
    }
    const rejectedTerm = () => {
        if (route.params?.onReject) {
            route.params.onReject(); 
        }
            navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Terms and Conditions</Text>
                <View style={styles.content}>
                    <Text style={styles.subtitle}>
                        Welcome to Aura! By creating an account with Aura, you agree to the 
                        following terms. Please read these terms carefully.
                    </Text>
                    <Text style={styles.subtitle}>1. Acceptance of Terms</Text>
                    <Text style={styles.text}>
                        By accessing or using the Aura app, you confirm that you have read, 
                        understood, and agree to be bound by these Terms.
                    </Text>
                    <Text style={styles.subtitle}>2. Description of Service</Text>
                    <Text style={styles.text}>
                        Aura is a smart comfort platform designed to provide personalized environmental 
                    controls and comfort recommendations based on user preferences and behavior.
                    </Text>
                    <Text style={styles.subtitle}>3. User Responsibilities</Text>
                    <Text style={styles.text}>
                        You agree to using the app only for lawful purposes and keeping your account 
                        credentials secure.
                    </Text>
                    <Text style={styles.subtitle}>4. Privacy</Text>
                    <Text style={styles.text}>
                        We care about your privacy. Please refer to our Privacy Policy to understand 
                        how we collect, use, and protect your data.
                    </Text>
                    <Text style={styles.subtitle}>5. Restrictions</Text>
                    <Text style={styles.text}>
                        You may not attempt unauthorized access to any part of the platform and use the app 
                        in any way that may harm Aura or its users.
                    </Text>
                    <Text style={styles.subtitle}>6. Updates & Modifications</Text>
                    <Text style={styles.text}>
                        We may update the app or these Terms from time to time. Continued use of the app 
                        after changes means you accept the revised Terms.
                    </Text>
                    <Text style={styles.subtitle}>7. Termination</Text>
                    <Text style={styles.text}>
                        We reserve the right to suspend or terminate your access if you violate these 
                        Terms or misuse the service.
                    </Text>
                    <Text style={styles.subtitle}>8. Disclaimer</Text>
                    <Text style={styles.text}>
                        Aura is provided “as is” and “as available.” We make no guarantees regarding 
                        availability, reliability, or accuracy of data.
                    </Text>
                    <Text style={styles.subtitle}>9. Contact Us</Text>
                    <Text style={styles.text}>
                        If you have any questions or concerns about these Terms, please contact us at 
                        sabrinaquach998@gmail.com.
                    </Text>
                    <Text style={styles.subtitle}>
                        By using the app, you acknowledge that you understand and agree to these 
                        Terms and Conditions.
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                    <Button backgroundColor="#A3C858C9" title="I agree to the Terms and Conditions" onPress={acceptedTerm} />
                    <View style={{ height: 60 }} />
                    <Button backgroundColor="#E3EFCD" title="I do not agree" onPress={rejectedTerm} />
            </View>
        </SafeAreaView>
    )
};

export default TermsAndConditions;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 15,
    },
    content: {
        paddingBottom: 25,
    },
    text: {
        fontSize: 16,
    },
    buttonContainer: {
        paddingHorizontal: 20,
        paddingTop: 60,
        top: 55,
    },
});

