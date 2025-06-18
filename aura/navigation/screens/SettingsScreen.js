import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';

import MainScreensStyle from '../../style/MainScreenStyles';
import Avatar from '../../component/profile/avatar';
import UploadModal from '../../component/profile/UploadModal';

export default function SettingsScreen ({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    // const FormData = global.FormData;

    //profile - display set username
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
    const uploadImage = async (mode) => {
        try {
            let result = {};

            if (mode === "gallery") {
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
            } else {
                await ImagePicker.requestCameraPermissionsAsync();
                result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.front,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
            }

            if (!result.canceled) {
                await saveImage(result.assets[0].uri);
            }
        } catch (error) {
            alert("Error uploading image: " + error.message);
            setModalVisible(false);
        }
    };

    //profile - remove image
    const removeImage = async () => {
        try {
            saveImage(null);
        } catch ({ message }) {
            alert(message);
            setModalVisible(false);
        }
    }; 

    const saveImage = async (image) => {
        try {
            setImage(image);

            //make api call to save image when set
            // sendToBackend();

            setModalVisible(false);
        } catch (error) {
            throw error;
        }
    };

    // const sendToBackend = async () => {
    //     try {
    //         const formData = new FormData();

    //         formData.append("image", {
    //             uri: image,
    //             type: "image/png",
    //             name: "profile-image",
    //         });

    //         const config = {
    //             headers: {
    //                 "Content-Type": "multipart/form-data"
    //             },
    //             tranformRequest: () => {
    //                 return formData;
    //             },
    //         };

    //         await axios.post("API LINK HERE", formData, config);

    //         alert("success");
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    //slider
    const [Occupancyvalue, setOccupancyValue] = useState(1);
    const [Energyvalue, setEnergyValue] = useState(1);
    const Occupancylabels = ['Low', 'High'];
    const Energylabels = ['Comfort', 'Eco', 'Balanced'];
    
    return (
        <View style={{ flex: 1 }}>
        <View style={MainScreensStyle.container}>
            <Text style={MainScreensStyle.title}>Settings</Text>
    
            <View style={MainScreensStyle.profileContainer}>
                <Avatar 
                    onButtonPress={() => setModalVisible(true)} 
                    uri={image} 
                />
                <Text style={MainScreensStyle.usernameText}>@{username}</Text>
                <UploadModal 
                    modalVisible={modalVisible}
                    onBackPress={() => setModalVisible(false)}
                    onCameraPress={() => uploadImage()}
                    onGalleryPress={() => uploadImage("gallery")}
                    onRemovePress={() => removeImage()}
                />
            </View>
      
            <View style={MainScreensStyle.sliderContainer}>
                <Text style={[MainScreensStyle.subtitle, {paddingBottom: 2, paddingTop: 10}]}>Occupancy Sensitivity</Text>
                <View style={MainScreensStyle.labelsContainer}>
                    {Occupancylabels.map((label) => (
                        <Text key={label} style={MainScreensStyle.labelText}>{label}</Text>
                    ))}
                </View>
                <Slider 
                    style={{width: '100%', height: 40}}
                    minimumValue={0}
                    maximumValue={2}
                    step={0.1}
                    value={Occupancyvalue}
                    onValueChange={setOccupancyValue}
                    minimumTrackTintColor="#D9D9D9"
                    maximumTrackTintColor="#D9D9D9"
                    thumbTintColor="#A3C858C9"
                />
                <Text style={MainScreensStyle.text}>Set how sensitive AuraTherm is to motion—higher levels may change temperature more often.</Text>
            </View>
        </View>
      
          <View style={MainScreensStyle.additionsContainer}>
            <View style={MainScreensStyle.separator}/>
            <TouchableOpacity 
                style={MainScreensStyle.itemRow} 
                onPress={() => navigation.navigate('AccountInfo')}
            >
                <Text style={MainScreensStyle.itemText}>Account Information</Text>
                <Icon 
                    name="chevron-right" 
                    size={25} 
                    style={MainScreensStyle.itemIcon}
                />
            </TouchableOpacity>
            <View style={MainScreensStyle.separator}/>
            <TouchableOpacity 
                style={MainScreensStyle.itemRow} 
                onPress={() => navigation.navigate('MainPreferences')}
            >
                <Text style={MainScreensStyle.itemText}>Preferences</Text>
                <Icon 
                    name="chevron-right" 
                    size={25} 
                    style={MainScreensStyle.itemIcon}
                />
            </TouchableOpacity>
            <View style={MainScreensStyle.separator}/>
        </View>
        </View>
    );      
}