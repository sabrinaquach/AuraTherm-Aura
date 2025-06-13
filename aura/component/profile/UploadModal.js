import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Modal } from 'react-native';

export default function UploadModal ({ 
    modalVisible,
    onBackPress,
    onCameraPress,
    onGalleryPress,
    onRemovePress,
    isLoading = false,
}) {
    return (
        <Modal animationType="fade" visible={modalVisible} transparent={true}>
            <Pressable style={styles.container} onPress={onBackPress}>
                {isLoading && <ActivityIndicator size={70} color="green"/>}

                {!isLoading && (
                    <View style={styles.modalView}>
                        <View style={styles.decisionColumn}>
                            <TouchableOpacity 
                                style={styles.optionButton} 
                                onPress={onCameraPress}
                            >
                                <Icon 
                                    name="camera"
                                    size={30}
                                    color="black"
                                />
                                <Text style={styles.optionText}>Take a photo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.optionButton} 
                                onPress={onGalleryPress}
                            >
                                <Icon 
                                    name="image"
                                    size={30}
                                    color="black"
                                />
                                <Text style={styles.optionText}>Upload from library</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.optionButton} 
                                onPress={onRemovePress}
                            >
                                <Icon 
                                    name="trash"
                                    size={30}
                                    color="black"
                                />
                                <Text style={styles.optionText}>Remove current picture</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 25,
    },
    decisionColumn: {
        flexDirection: 'column',
        paddingBottom: 15,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        gap: 10,
        // paddingBottom: 30,
      },
});