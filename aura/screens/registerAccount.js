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
}
export default Account;

const styles = StyleSheet.create ({ 
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