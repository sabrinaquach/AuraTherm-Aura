import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import mime from 'mime'; 
import { Buffer } from 'buffer';
global.Buffer = Buffer;

import MainScreensStyle from '../../style/MainScreenStyles';
import Avatar from '../../component/profile/avatar';
import UploadModal from '../../component/profile/UploadModal';
import Loader from '../../component/loader'
import supabase from '../../auth/client';

export default function SettingsScreen ({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    //profile - display email
    const [email, setEmail] = useState('');

    // useEffect (() => {
    //     const loadUserData = async () => {
    //         const findUser = await AsyncStorage.getItem('email');
    //         if (findUser) {
    //             const user = JSON.parse(findUser);
    //             setEmail(user.email);
    //         }
    //     };
    //     loadUserData();
    // }, []);

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
            if (image) {
                //get the filename from the image URI
                const fileName = image.split('/').pop();
      
                const { error } = await supabase
                .storage
                .from('profile-image') 
                .remove([fileName]);
      
                if (error) {
                    throw error;
                }
      
                setImage(null);
                setModalVisible(false);
                console.log('Image removed from Supabase');
            } else {
                setImage(null);
                setModalVisible(false);
            }
        } catch (error) {
            alert("Error removing image: " + error.message);
            setModalVisible(false);
        }
    };
      

    //check if user has account before uploading image
    useEffect(() => {
        const checkAuth = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error getting session:', error);
            } else if (!data.session) {
                console.log('User is not authenticated.');
            } else {
                console.log('User is authenticated:', data.session.user);
            }
        };
      
        checkAuth();
    }, []);

    const uploadToSupabase = async (uri) => {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (!sessionData.session) {
            alert("You must be logged in to upload images.");
            return;
        }

        const fileExt = uri.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const fileType = mime.getType(uri) || 'image/png';
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        const buffer = Buffer.from(base64, 'base64');
      
        const { data, error } = await supabase.storage
            .from('profile-image')
            .upload(fileName, buffer, {
                contentType: fileType,
                upsert: true,
            });
      
        if (error) throw error;
      
        return data;
      };

    const saveImage = async (imageUri) => {
        try {
            setImage(imageUri);
            setModalVisible(false);
      
            const result = await uploadToSupabase(imageUri);
            console.log('Image uploaded to Supabase:', result);

            await supabase.auth.updateUser({
                data: { avatar: result.path }
            });
          
        } catch (error) {
            console.error("Error saving/uploading image:", error);
            alert("Upload failed: " + error.message);
        }
    };

    useEffect(() => {
        const loadUserImage = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
      
            const user = session?.user;
            const avatarPath = user?.user_metadata?.avatar;
        
            console.log("Avatar path from metadata:", avatarPath); 
      
            if (avatarPath) {
                const { data, error } = await supabase.storage
                .from('profile-image')
                    .createSignedUrl(avatarPath, 60 * 60);

                if (error) {
                    console.error("Error creating signed URL:", error.message);
                } else {
                    setImage(data.signedUrl);
                }
            }
        };
      
        loadUserImage();
    }, []);
      
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
                    <Text style={MainScreensStyle.usernameText}>{email}</Text>
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