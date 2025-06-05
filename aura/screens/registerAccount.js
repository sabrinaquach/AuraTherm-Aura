import React, {useState, useCallback, useRef } from 'react';
import {View, Text, Image, ScrollView, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import { RadioButton } from 'react-native-paper';

const Account = ({ navigation }) => {
    const [text, setText] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSelected, setIsSelected] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create An Account</Text>
            <Text style={styles.subtitle}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder='johnsmith'
                placeholderTextColor='gray'
                defaultValue={text}
                // onChangeText={setUsername}
            />
            <Text style={styles.subtitle}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder='johnsmith@gmail.com'
                placeholderTextColor='gray'
                defaultValue={text}
                // onChangeText={setUsername}
            />
            <Text style={styles.subtitle}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder='Password must be at least 8 characters'
                placeholderTextColor='gray'
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
            <View style={styles.buttonContainer}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Preferences')}
            >
                <Text style={styles.buttonText}>Start Setting My Preferences</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}
export default Account;

const styles = StyleSheet.create ({ 
    container: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 20, 
        backgroundColor: '#fff',
    },
    input: {
        color: 'black',
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D9D9D9',
        padding: 10,
        // placeholderTextColor: 'gray',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '500',
        paddingBottom: 5,
        paddingTop: 20,
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
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',  
        alignItems: 'center',   
    },
    button: {
        backgroundColor: '#A3C858C9',
        width: 350,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 20,
        position: 'absolute',
        bottom: 50,
      },
      buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
      },
});