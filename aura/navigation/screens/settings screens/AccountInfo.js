import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';

import MainScreensStyle from '../../../style/MainScreenStyles';
import Avatar from '../../../component/profile/avatar';
import UploadModal from '../../../component/profile/UploadModal';
import useAvatar from '../../../utilties/useAvatar';
import supabase from '../../../auth/client';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountInfo ({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    //profile - display username, email, password
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect (() => {
        const loadUserData = async () => {
            const { data } = await supabase.auth.getSession();
            const user = data?.session?.user;
            const username = user?.user_metadata?.username;
            const email = user?.user_metadata?.email;
            const password = user?.user_metadata?.password;

            if (username) {
                setUsername(username);
                setEmail(email);
                setPassword(password);
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
    
    return (
        <SafeAreaView style={MainScreensStyle.SafeArea}>
            <View style={MainScreensStyle.headerContainer}>
                <TouchableOpacity 
                    style={MainScreensStyle.backButton}
                    onPress={() => navigation.navigate('SettingsMain')}
                >
                    <Icon 
                        name="chevron-left"
                        size="30"
                    />
                </TouchableOpacity>
                <Text style={MainScreensStyle.editAccountTitle}>Profile</Text>
            </View>
            <View style={MainScreensStyle.profileContainer}>
                <Avatar onButtonPress={() => setModalVisible(true)} uri={image}/>
                <Text style={MainScreensStyle.usernameText}>@{username}</Text>
                <UploadModal 
                    modalVisible={modalVisible}
                    onBackPress={() => {
                        setModalVisible(false);
                    }}
                    onCameraPress={() => uploadImage()}
                    onGalleryPress={() => uploadImage("gallery")}
                    onRemovePress={() => removeImage()}
                />
            </View>
            <View style={MainScreensStyle.accountSection}>
                <View style={MainScreensStyle.editContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('EditAccountInfo')}>
                        <Text style={MainScreensStyle.editButton}>Edit</Text>
                    </TouchableOpacity>
                </View>

                <View style={MainScreensStyle.accountTextContainer}> 
                    <Text style={MainScreensStyle.accountInfoLabel}>Username</Text>
                    <Text style={MainScreensStyle.accountInfo}>{username}</Text>
                    <Text style={MainScreensStyle.accountInfoLabel}>Email</Text>
                    <Text style={MainScreensStyle.accountInfo}>{email}</Text>
                </View>
            </View>
        </SafeAreaView>
        
    );
}