import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';

import MainScreensStyle from '../../style/MainScreenStyles';
import Avatar from '../../component/profile/avatar';
import UploadModal from '../../component/profile/UploadModal';

export default function SettingsScreen ({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    //profile - username
    const [username, setUsername] = useState('');

    useEffect (() => {
        const loadUserData = async () => {
            const findUser = await AsyncStorage.getItem('user');
            if (findUser) {
                const user = JSON.parse(findUser);
                setUsername(user.username);
            }
        };
        loadUserData();
    }, []);

    //profile - upload image
    const [image, setImage] = useState();
    const uploadImage = async () => {
        try {
            await ImagePicker.requestCameraPermissionsAsync();
            let result = await ImagePicker.launchCameraAsync({
                cameraType: ImagePicker.CameraType.front,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                await saveImage(result.assets[0].uri);
            }
        } catch (error) {
            alert("Error uploading image: " + error.message);
            setModalVisible(false);
        }
    };

    const saveImage = async (image) => {
        try {
            setImage(image);
            setModalVisible(false);
        } catch (error) {
            throw error;
        }
    };

    //slider
    const [value, setValue] = useState(1);
    const labels = ['Low', 'High'];

    return (
        <View style={MainScreensStyle.container}>
            <Text 
                style={MainScreensStyle.title}
                onPress={() => navigation.navigate('Home')}
            >
                Settings
            </Text>
            <View style={MainScreensStyle.profileContainer}>
                <Avatar onButtonPress={() => setModalVisible(true)} uri={image}/>
                <Text style={MainScreensStyle.usernameText}>@{username}</Text>
                <UploadModal 
                    modalVisible={modalVisible}
                    onBackPress={() => {
                        setModalVisible(false);
                    }}
                    onCameraPress={() => uploadImage()}
                />
            </View>
            <View style={MainScreensStyle.sliderContainer}>
                <Text style={MainScreensStyle.subtitle}>Occupancy Sensitivity</Text>
                <View style={MainScreensStyle.labelsContainer}>
                    {labels.map((label) => (
                        <Text key={label} style={MainScreensStyle.labelText}>{label}</Text>
                    ))}
                </View>
                <Slider 
                    style={{width: '100%', height: 40, position: 'fixed'}}
                    minimumValue={0}
                    maximumValue={2}
                    step={0.2}
                    value={value}
                    onValueChange={setValue}
                    minimumTrackTintColor="#D9D9D9"
                    maximumTrackTintColor="#D9D9D9"
                    thumbTintColor="#A3C858C9"
                />
                <Text style={MainScreensStyle.text}>Adjust how sensitive the AuraTherm sensor is to motion. Higher sensitivity may trigger temperature changes more frequently.</Text>
            </View>
        </View>
    );
}