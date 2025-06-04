import React, {useState} from 'react';
import {View, Text, Image, ScrollView, TextInput, Button, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { RadioButton } from 'react-native-paper';

const OnboardingScreen = ({ navigation }) => {
    const [text, setText] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSelected, setIsSelected] = useState(false);

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
                            <View style={styles.radioGroup}>
                                <View style={styles.radioButton}>
                                    <RadioButton
                                        value={isSelected}
                                        status={isSelected ? 'checked' : 'unchecked'}
                                        onPress={() => setIsSelected(!isSelected)}
                                        color="green"
                                    />
                                    <Text style={styles.radioLabel}>I accept the terms and privacy policy.</Text>
                                </View>
                            </View>
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
        alignItems: 'left',
        paddingLeft: 25,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'medium',
        textAlign: 'left',
        paddingTop: 20,
        paddingBottom: 8,
        justifyContent: 'left',
        alignItems: 'left',
    },
    input: {
        color: 'black',
        width: 350,
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D9D9D9',
        padding: 10,
    },
    radioGroup: {
        flexDirection: 'row', 
        alignItems: 'left', 
        marginTop: 20, 
      },
      radioButton: {
        flexDirection: 'row', 
        alignItems: 'center', 
      },
      radioLabel: {
        marginLeft: 8, 
        fontSize: 16,
        color: '#333',
      },
});