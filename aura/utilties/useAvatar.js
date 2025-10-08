import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { File, Directory, Paths } from 'expo-file-system';
import * as FS from 'expo-file-system/legacy';
import mime from 'mime'; 
import { Buffer } from 'buffer';
import { decode } from 'base64-arraybuffer';
global.Buffer = Buffer;

import supabase from '../auth/client';

export default function useAvatar() {
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState();

    const uploadToSupabase = async (uri) => {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (!sessionData.session) {
            alert("You must be logged in to upload images.");
            return;
        }

        const fileExt = uri.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const fileType = mime.getType(uri) || 'image/png';
        const base64 = await FS.readAsStringAsync(uri, { encoding: FS.EncodingType.Base64 });
        const buffer = decode(base64);
    
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
    return { image, setImage, saveImage, removeImage };

};