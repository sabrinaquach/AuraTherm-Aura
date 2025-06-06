import React, {useState, useCallback, useRef } from 'react';
import {View, Text, Image, ScrollView, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { RadioButton } from 'react-native-paper';

const OnboardingScreen = ({ navigation }) => {
    const [text, setText] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //terms & conditions button
    const [isSelected, setIsSelected] = useState(false);
    
    //to create own buttons
    const swiperRef = useRef(null);

    return (
        <SafeAreaView style={styles.safeArea}>
            <Onboarding
                // onSkip={() => navigation.replace('Home')}
                // onDone={() => navigation.replace('Home')}
                ref={swiperRef}
                showNext={false} 
                showSkip={false}
                showDone={false}
                pages={[
                    {
                        title: (
                            <View style={styles.page}>
                                <Text style={styles.title}>Welcome to Aura</Text>
                                <Text style={styles.subtitle}>Smart comfort that adapts to you.</Text>
                                {/* <Image source={require('../assets/image-placeholder.png')} style={styles.image} /> */}
                                <Text style={styles.text}>Aura's mission aims to promote environmental sustainability and reduced utility costs.</Text>
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={() => swiperRef.current?.goToPage(1, true)}
                                >
                                    <Text style={styles.buttonText}>Get Started</Text>
                                </TouchableOpacity>
                            </View>
                        )
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
                                    secureTextEntry
                                    // onChangeText={setUsername}
                                />
                                <View style={styles.radioGroup}>
                                    <View style={styles.radioButton}>
                                        <RadioButton
                                            value={isSelected}
                                            status={isSelected ? 'checked' : 'unchecked'}
                                            onPress={() => setIsSelected(!isSelected)}
                                            color="green"
                                            borderWidth="1"
                                        />
                                        <View style={styles.learnContainer}>
                                            <Text style={styles.radioLabel}>I accept the terms and privacy policy.</Text>
                                            <TouchableOpacity 
                                                onPress={() => navigation.navigate('Terms', 
                                                {
                                                    onAgree: () => setIsSelected(true),
                                                    onReject: () => setIsSelected(false),
                                                }
                                                )}
                                            >
                                                <Text style={styles.linkText}>Learn More</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    
                    },
                ]}
            />
        </SafeAreaView>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create ({
    safeArea: {
        flex: 1,
    },
    container: {
        flexShrink: 1,
        width: 402,
        height: 874,
        alignItems: 'left',
        paddingLeft: 25,
        
    },
    page: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',  
        alignItems: 'center',   
        backgroundColor: '#fff',
      },
    title: {
        fontSize: 24,
        paddingBottom: 15,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '400',
        paddingBottom: 15,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',      
        color: '#444',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#A3C858C9',
        width: 350,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
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
    learnContainer: {
        flexDirection: 'column',
    },
    radioLabel: {
        marginLeft: 8, 
        fontSize: 16,
        color: '#333',
    },
    linkText: {
        marginLeft: 8, 
        fontSize: 16,
        color: '#757575',
    },
});