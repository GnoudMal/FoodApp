import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AxiosInstance from '../../axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleRememberMeToggle = () => {
        setRememberMe(!rememberMe);
    };

    const onSubmit = async () => {
        if (!email || !password) {
            setModalMessage('Vui lòng nhập email và mật khẩu.');
            setModalVisible(true);
            return;
        }

        try {
            const response = await AxiosInstance().get(`/account?email=${email}&password=${password}`);
            if (response.status === 200 && response.data.length > 0) {
                const token = response.data[0].token;
                const passOld = response.data[0].password;
                const avatarUrl = response.data[0].avatar;
                const objU = response.data[0];
                if (passOld === password) {
                    if (rememberMe == true) {
                        await AsyncStorage.setItem('userToken', token);
                    }
                    await AsyncStorage.setItem('avatarUrl', avatarUrl);
                    await AsyncStorage.setItem('UserData', JSON.stringify(objU));
                    console.log('token', token);
                    console.log('password', JSON.stringify(objU));
                    setModalMessage('Đăng nhập thành công');
                    setModalVisible(true);
                    navigation.navigate('Home');
                } else {
                    setModalMessage('Mật khẩu không đúng.');
                    setModalVisible(true);
                    console.log('data', response.data);
                    console.log('token', response.data.token);
                }
            } else {
                setModalMessage('Email hoặc mật khẩu không đúng.');
                setModalVisible(true);
            }
        } catch (error) {
            console.log("error", error);
            if (error.response && error.response.status === 404) {
                setModalMessage('Email hoặc mật khẩu không đúng.');
                setModalVisible(true);
            } else {
                setModalMessage('Đã xảy ra lỗi khi kiểm tra đăng nhập.');
                setModalVisible(true);
            }
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ImageBackground style={styles.bgLogin} source={require('../images/bg_login.jpg')}>
                <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.logoContainer}>
                                <View style={styles.logoBackground}>
                                    <Image style={styles.logo} source={require('../images/logo_foodApp.png')} />
                                </View>
                            </View>
                            <View style={styles.welcomeContainer}>
                                <Text style={styles.welcomeText}>Welcome to Laturu !!</Text>
                                <Text style={styles.loginText}>Login to Continue</Text>
                            </View>
                            <View style={styles.boxInput}>
                                <View style={styles.fieldLogin}>
                                    <TextInput style={styles.emailInput} placeholder='Email Address' onChangeText={(value) => setEmail(value)} />
                                </View>
                                <View style={styles.fieldLogin}>
                                    <TextInput style={styles.passwordInput} placeholder='Password' secureTextEntry={!showPassword} onChangeText={setPassword} />
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ height: '100%', width: 30, position: 'absolute', right: 30, top: 0 }}>
                                        <Image
                                            style={{ height: '100%', width: '100%' }}
                                            resizeMode='contain'
                                            source={showPassword ? require('../icons/ic_visible.png') : require('../icons/ic_visibility.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'flex-start', marginHorizontal: 25, }}>
                                <Pressable style={styles.rememberMeContainer} onPress={handleRememberMeToggle}>
                                    <View style={styles.checkbox}>
                                        {rememberMe && <Image style={styles.checkboxIcon} source={require('../icons/ic_checked.png')} />}
                                    </View>
                                </Pressable>
                                <Text style={styles.rememberMeText}>Remember Me</Text>
                            </View>
                            <View style={styles.signInField}>
                                <TouchableOpacity style={styles.loginButton}
                                    onPress={() => {
                                        onSubmit()
                                    }}
                                >
                                    <Text style={styles.buttonText}>Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.googleButton}>
                                    <Text style={styles.buttonText}>Sign in with Google</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.RegisterField}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{
                                        color: '#a5a8a7',
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        marginEnd: 5
                                    }}>Don't have account? Click</Text>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('Register')
                                    }}>
                                        <Text style={{ color: 'orange', fontSize: 15, fontWeight: 'bold' }}>Register</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>{modalMessage}</Text>
                            <Pressable
                                style={[styles.modalButton, styles.modalCloseButton]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.modalButtonText}>OK</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

export default Login;

const styles = StyleSheet.create({
    bgLogin: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    boxInput: {
        width: '100%',
        height: '20%',
        marginTop: 0.09 * deviceHeight,
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 0.09 * deviceHeight,
    },
    logoBackground: {
        width: 125,
        height: 125,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1FFFF',
        borderRadius: 100,
        opacity: 0.8,
    },
    logo: {
        width: 140,
        height: 140,
        borderRadius: 15,
    },
    fieldLogin: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    emailInput: {
        backgroundColor: '#fff',
        height: 55,
        width: '97%',
        borderWidth: 1,
        borderColor: '#7a7d82',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    passwordInput: {
        backgroundColor: '#fff',
        height: 55,
        width: '97%',
        borderWidth: 1,
        borderColor: '#7a7d82',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'FS Harabara',
    },
    loginText: {
        fontSize: 18,
        color: '#828282',
        marginTop: 5,
    },
    signInField: {
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton: {
        width: '85%',
        height: '30%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00b56bbf',
    },
    googleButton: {
        marginTop: 20,
        width: '85%',
        height: '30%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    RegisterField: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    checkbox: {
        backgroundColor: 'black',
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkboxIcon: {
        width: 15,
        height: 15,
    },
    rememberMeText: {
        color: 'white',
        fontSize: 18,
    },
    // Modal styles
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    modalCloseButton: {
        backgroundColor: '#00b56bbf',
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },
});

