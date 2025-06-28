import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

import MainScreensStyle from '../../../style/MainScreenStyles';
import Avatar from '../../../component/profile/avatar';
import UploadModal from '../../../component/profile/UploadModal';
import useAvatar from '../../../utilties/useAvatar';
import supabase from '../../../auth/client';
import Input from '../../../component/input';
import Button from '../../../component/button';
import useLoginValidation from '../../../utilties/useLoginValidation';

const EditAccountInfo = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    //profile - display username, email, password
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const loadUserData = async () => {
            const { data } = await supabase.auth.getSession();
            const user = data?.session?.user;
            const username = user?.user_metadata?.username;
            const email = user?.email;
    
            if (username || email) {
                setUsername(username);
                setEmail(email);
    
                handleOnChange(username, 'username');
                handleOnChange(email, 'email');
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
    //call LoginValidation.js - ensure user enters inputs
        const {
            inputs,
            errors,
            handleOnChange,
            handleError,
            validate,
          } = useLoginValidation();

    //save changes
    const [savingChanges, setSavingChanges] = useState(false);
    const saveChanges = async () => {
        const isValid = validate();
        if (!isValid) return;
    
        try {
            setSavingChanges(true);
    
            const { error } = await supabase.auth.updateUser({
                email: inputs.email,
                data: {
                    username: inputs.username,
                },
            });
    
            if (error) {
                Alert.alert("Update failed", error.message);
            } else {
                Alert.alert("Success", "Account updated successfully.");
                navigation.navigate("AccountInfo");
            }
    
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setSavingChanges(false);
        }
    };
    

    return (
        <View style={MainScreensStyle.container}>
            <View style={MainScreensStyle.headerContainer}>
                <TouchableOpacity 
                    style={MainScreensStyle.backButton}
                    onPress={() => navigation.navigate('AccountInfo')}
                >
                    <Icon 
                        name="chevron-left"
                        size="30"
                    />
                </TouchableOpacity>
                <Text style={MainScreensStyle.editAccountTitle}>Edit Profile</Text>
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
            <View> 
                <Input
                    label="Username"
                    value={inputs.username}
                    placeholder='Enter new username'
                    placeholderTextColor='gray'
                    error={errors.username}
                    onFocus={() => {
                        handleError(null, 'username')
                    }}
                    onChangeText={text => handleOnChange(text, 'username')}
                />
                <Input
                    label="Email"
                    value={inputs.email}
                    placeholder='Enter new email'
                    placeholderTextColor='gray'
                    error={errors.email}
                    onFocus={() => {
                        handleError(null, 'email')
                    }}
                    onChangeText={text => handleOnChange(text, 'email')}

                />
            </View>
            <Button 
                backgroundColor="#A3C858C9"
                title="Save Changes" 
                onPress={saveChanges}
            />
        </View>
    )
}
export default EditAccountInfo;
