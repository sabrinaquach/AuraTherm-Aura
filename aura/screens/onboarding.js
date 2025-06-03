import React, {useState} from 'react';
import {View, Text, Image, ScrollView, TextInput, Button, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({ navigation }) => {
    const [text, setText] = useState('');

    return (
        <Onboarding
            onSkip={() => navigation.replace('Home')}
            onDone={() => navigation.replace('Home')}
            pages={[
                {
                    backgroundColor: '#fff',
                    title: 'Welcome to Aura',
                    // image: <Image source={require('./Images/Screenshot 2025-06-02 at 3.01.38 PM.png')} />,
                    subtitle: 'Smart comfort that adapts to you.',
                },
                {
                    backgroundColor: '#fff',
                    title: 'Create An Account',
                    // image: <Image source={require('./Images/Screenshot 2025-06-02 at 3.01.38 PM.png')} />,
                    subtitle: (
                        <View style={styles.container}>
                            <Text style={styles.subtitle}>Username</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='johnsmith'
                                defaultValue={text}
                                // onChangeText={setUsername}
                            />
                            <Text style={styles.subtitle}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='johnsmith@gmail.com'
                                defaultValue={text}
                                // onChangeText={setUsername}
                            />
                            <Text style={styles.subtitle}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='*****'
                                defaultValue={text}
                                // onChangeText={setUsername}
                            />
                        </View>
                    )
                    
                },
            ]}
        />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create ({
    container: {
        flexShrink: 0,
        width: 402,
        height: 874,
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'medium',
        textAlign: 'left',
        paddingTop: 20,
        paddingBottom: 8,
    },
    input: {
        color: 'black',
        width: 350,
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D9D9D9',
    },
});