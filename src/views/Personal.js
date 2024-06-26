import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Personal = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [index, setIndex] = useState('');
    const [avatar, setAvatar] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
    const [newAvatarUrl, setNewAvatarUrl] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('UserData');
                if (userData !== null) {
                    const userDataJSON = JSON.parse(userData);
                    setName(userDataJSON.name);
                    setEmail(userDataJSON.email);
                    setPassword(userDataJSON.password);
                    setRePassword(userDataJSON.password);
                    setAvatar(userDataJSON.avatar);
                    setIndex(userDataJSON.id);
                    console.log(userDataJSON.id);
                }
            } catch (error) {
                console.error('Error fetching user data from AsyncStorage:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleSave = async () => {
        if (password !== rePassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log(index);
        try {
            const updatedUserData = { name, email, password, avatar };
            const res = await axios.put(`https://665d43ebe88051d60405ed44.mockapi.io/account/${index}`, updatedUserData);
            console.log(res.data);
            await AsyncStorage.setItem('UserData', JSON.stringify(updatedUserData));
            navigation.goBack();
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    const handleAvatarChange = () => {
        setAvatar(newAvatarUrl);
        setModalVisible(false);
    };

    const handleChangePassword = () => {
        if (currentPassword !== password) {
            alert("Current password is incorrect!");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            alert("New passwords do not match!");
            return;
        }
        setPassword(newPassword);
        setRePassword(newPassword);
        setModalPasswordVisible(false);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.headerText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave}>
                    <Text style={styles.headerText}>Save</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.avatarContainer}>
                <Image source={{ uri: avatar }} style={styles.avatar} />
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.changeAvatarText}>Change Avatar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <Pressable onPress={() => setModalPasswordVisible(true)} style={{ alignItems: 'center', marginTop: 20 }}>
                <Text style={styles.headerText}>Change Password</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Enter Avatar URL</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={newAvatarUrl}
                            onChangeText={setNewAvatarUrl}
                            placeholder="https://example.com/avatar.jpg"
                        />
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleAvatarChange}
                        >
                            <Text style={styles.modalButtonText}>Change Avatar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalPasswordVisible}
                onRequestClose={() => {
                    setModalPasswordVisible(!modalPasswordVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Change Password</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            placeholder="Current Password"
                            secureTextEntry
                        />
                        <TextInput
                            style={styles.modalInput}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholder="New Password"
                            secureTextEntry
                        />
                        <TextInput
                            style={styles.modalInput}
                            value={confirmNewPassword}
                            onChangeText={setConfirmNewPassword}
                            placeholder="Confirm New Password"
                            secureTextEntry
                        />
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleChangePassword}
                        >
                            <Text style={styles.modalButtonText}>Change Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setModalPasswordVisible(!modalPasswordVisible)}
                        >
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default Personal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C0F14',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    headerText: {
        backgroundColor: 'rgba(233, 165, 64, 0.8)',
        padding: 10,
        borderRadius: 15,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    changeAvatarText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    inputContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    label: {
        color: 'white',
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: 'white',
        color: 'black',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        padding: 35,
        margin: 20,
        borderRadius: 20,
        alignItems: 'center',
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalInput: {
        width: 250,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    modalButton: {
        backgroundColor: 'rgba(233, 165, 64, 0.8)',
        padding: 10,
        borderRadius: 15,
        marginTop: 10,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
