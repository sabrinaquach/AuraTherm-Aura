import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

import MainScreensStyle from '../../../style/MainScreenStyles';
import Avatar from '../../../component/profile/avatar';
import UploadModal from '../../../component/profile/UploadModal';
import Input from '../../../component/input';
import Button from '../../../component/button';

const EditAccountInfo = ({ navigation }) => {
    //profile - display set username
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect (() => {
        const loadUserData = async () => {
            const findUser = await AsyncStorage.getItem('user');
            if (findUser) {
                const user = JSON.parse(findUser);
                setUsername(user.username);
                setEmail(user.email);
                setPassword(user.password);
            }
        };
        loadUserData();
    }, []);

    //profile - upload image
        const [modalVisible, setModalVisible] = useState(false);
    
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

    //error handling & validation for input boxes
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const validate = () => {
        Keyboard.dismiss();
        let valid = true;

        //username and password validation
        if(!inputs.username) {
            handleError('Please input username', 'username');
            valid = false;
        } 
        if(!inputs.password) {
            handleError('Please input password', 'password');
            valid = false;
        } else if(inputs.password.length < 8) {
            handleError('Minimum password length of 8 characters', 'password');
            valid = false;
        }

        //email validation
        if(!inputs.email) {
            handleError('Please input email', 'email');
            valid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please input valid email', 'email');
            valid = false;
        }

        //terms validation
        if(!isSelected) {
            handleError('Please accept the terms', 'terms');
            valid = false;
        } else {
            handleError(null, 'terms');
        }

        if(valid) {
            register();
        }
    };

    const register = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);

            try {
                AsyncStorage.setItem("user", JSON.stringify(inputs));
                navigation.navigate('Login');
            } catch (error) {
                Alert.alert('Error', 'Something went wrong');
            }
        }, 2000);
    };

    const handleOnChange = (text, input) => {
        setInputs(prevState => ({...prevState, [input] : text}));
    };

    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({...prevState, [input] : errorMessage}));
    };

    //save changes
    const [savingChanges, setSavingChanges] = useState(false);
    const saveChanges = async () => {
        try {
            setSavingChanges(true);

            // sendToBackend();

            setSavingChanges(false);
            navigation.navigate("AccountInfo");
        } catch ({ message }) {
            alert(message);
            setSavingChanges(false);
        }
    }

    // const sendToBackend = async () => {
    //     try {
    //         const formData = new FormData();

    //         formData.append("username", username);
    //         formData.append("email", email);
    //         formData.append("password", password);
    //         formData.append("image", {
    //             uri: image,
    //             type: "image/png",
    //             name: "product-image",
    //         });

    //         const config = {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //              },
    //             transformRequest: () => {
    //                 return formData;
    //             },
    //         };

    //         await axios.post("API link", formData, config);

    //         alert("sucess");
    //     } catch (error) {
    //         throw error;
    //     }
    // }

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
                    placeholder={username}
                    placeholderTextColor='gray'
                    error={errors.username}
                    onFocus={() => {
                        handleError(null, 'username')
                    }}
                    onChangeText={text => handleOnChange(text, 'username')}
                />
                <Input
                    label="Email"
                    placeholder={email}
                    placeholderTextColor='gray'
                    error={errors.email}
                    onFocus={() => {
                        handleError(null, 'email')
                    }}
                    onChangeText={text => handleOnChange(text, 'email')}

                />
                <Input
                    label="Password"
                    placeholder={password}
                    placeholderTextColor='gray'
                    error={errors.password}
                    onFocus={() => {
                        handleError(null, 'password')
                    }}
                    onChangeText={text => handleOnChange(text, 'password')}
                    password
                />
            </View>
            <Button 
                backgroundColor="#A3C858C9"
                title="Save Changes" 
                onPress={validate}
            />
        </View>
    )
}
export default EditAccountInfo;
