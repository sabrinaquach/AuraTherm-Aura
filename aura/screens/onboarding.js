import React from 'react';
import {View, Text, Image, ScrollView, TextInput, Button} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({ navigation }) => {
    // const [name, setName] = useState('');

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
                        <View>
                            <Text style={styles.subtitle}>Username</Text>
                            <TextInput
                                style={{
                                    width: 350,
                                    height: 50,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    borderColor: '#D9D9D9',
                                }}
                                placeholder='johnsmith'
                                defaultValue='johnsmith'
                                // onChangeText={setUsername}
                            />
                            <Text style={styles.subtitle}>Email</Text>
                            <TextInput
                                style={{
                                    width: 350,
                                    height: 50,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    borderColor: '#D9D9D9',
                                }}
                                placeholder='johnsmith@gmail.com'
                                defaultValue='johnsmith@gmail.com'
                                // onChangeText={setUsername}
                            />
                            <Text style={styles.subtitle}>Password</Text>
                            <TextInput
                                style={{
                                    width: 350,
                                    height: 50,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    borderColor: '#D9D9D9',
                                }}
                                placeholder='*****'
                                defaultValue='*****'
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