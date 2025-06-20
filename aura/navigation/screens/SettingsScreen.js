import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';

import MainScreensStyle from '../../style/MainScreenStyles';
import Avatar from '../../component/profile/avatar';
import UploadModal from '../../component/profile/UploadModal';
import Loader from '../../component/loader';
import supabase from '../../auth/client';
import useAvatar from '../../utilties/useAvatar';

export default function SettingsScreen ({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    //profile - display username
    const [username, setUsername] = useState('');

    useEffect (() => {
        const loadUserData = async () => {
            const { data } = await supabase.auth.getSession();
            const user = data?.session?.user;
            const username = user?.user_metadata?.username;

            if (username) {
                setUsername(username);
            }
        };
        loadUserData();
    }, []);

    //call useAvatar.js - load user data for pfp
    const { image, setImage, saveImage, removeImage } = useAvatar();
    
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
      
    //supabase - log out
    const [loading, setLoading] = useState(false);
    const handleLogout = async () => {
        setLoading(true);
    
        setTimeout(async () => {
            const { error } = await supabase.auth.signOut();
            setLoading(false);
    
            if (error) {
                Alert.alert('Error', error.message);
            } else {
                navigation.replace('Login');
            }
        }, 1500);
    };

    //slider
    const [Occupancyvalue, setOccupancyValue] = useState(1);
    const [Energyvalue, setEnergyValue] = useState(1);
    const Occupancylabels = ['Low', 'High'];
    const Energylabels = ['Comfort', 'Eco', 'Balanced'];
    
    return (
        <View style={{ flex: 1 }}>
            <Loader visible={loading} label="Logging you out..."/>
            <View style={MainScreensStyle.container}>
                <Text style={MainScreensStyle.title}>Settings</Text>
        
                <View style={MainScreensStyle.profileContainer}>
                    <Avatar 
                        onButtonPress={() => setModalVisible(true)} 
                        uri={image} 
                    />
                    <Text style={MainScreensStyle.usernameText}>{username}</Text>
                    <UploadModal 
                        modalVisible={modalVisible}
                        onBackPress={() => setModalVisible(false)}
                        onCameraPress={() => uploadImage()}
                        onGalleryPress={() => uploadImage("gallery")}
                        onRemovePress={() => removeImage()}
                    />
                </View>
        
                <View style={MainScreensStyle.sliderContainer}>
                    <Text style={[MainScreensStyle.subtitle, {paddingBottom: 2}]}>Occupancy Sensitivity</Text>
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
                <TouchableOpacity 
                    style={MainScreensStyle.itemRow} 
                    onPress={handleLogout}
                >
                    <Text style={MainScreensStyle.itemText}>Log Out</Text>
                    <Icon 
                        name="log-out" 
                        size={25} 
                        style={MainScreensStyle.itemIcon}
                    />
                </TouchableOpacity>
                <View style={MainScreensStyle.separator}/>
            </View>
        </View>
    );      
}