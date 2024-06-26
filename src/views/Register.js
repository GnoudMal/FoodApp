import React, { useState } from 'react';
import { Alert, Dimensions, Image, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import AxiosInstance from '../../axiosInstance';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [retypePass, setRetypePass] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showRetypePassword, setShowRetypePassword] = useState(false);

    const onSubmit = async () => {
        let formData = {
            email: email,
            password: pass,
            name: name
        };

        try {
            const response = await AxiosInstance().post('/account', formData);
            console.log(response);
            if (response.data) {
                Alert.alert('Success', `Đăng ký thành công: ${response.data.email}`);
                navigation.navigate('Login');
            }
        } catch (error) {
            if (error.response) {
                Alert.alert('Lỗi', `Server trả về lỗi: ${error.response.data.message}`);
            } else if (error.request) {
                Alert.alert('Lỗi', 'Không có phản hồi từ máy chủ Chính.');
            } else {
                Alert.alert('Lỗi', `Lỗi khi thiết lập yêu cầu: ${error.message}`);
            }
        }
    };
    const checkEmailExists = async (email) => {
        try {
            const response = await AxiosInstance().get('/account');
            const emails = response.data.map(account => account.email);
            return emails.includes(email);
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const handleRegister = async () => {
        if (await checkEmailExists(email)) {
            Alert.alert('Error', 'Email đã được sử dụng.');
        } else {
            if (validate()) {
                onSubmit();
            }
        }
    };

    const validate = () => {
        let valid = true;
        let errors = {};

        if (!name.trim()) {
            errors.name = 'Name is required';
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.email = 'Invalid email address';
            valid = false;
        }

        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passRegex.test(pass)) {
            errors.pass = 'Password must be at least 8 characters long and contain at least one letter and one number';
            valid = false;
        }

        if (pass !== retypePass) {
            errors.retypePass = 'Passwords do not match';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    return (
        <ImageBackground style={styles.bgLogin} source={require('../images/bg_login.jpg')}>
            <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ width: '100%', height: '100%' }}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoBackground}>
                            <Image style={styles.logo} source={require('../images/logo_foodApp.png')} />
                        </View>
                    </View>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>Welcome to Laturu !!</Text>
                        <Text style={styles.loginText}>Register to Continue</Text>
                    </View>
                    <View style={styles.boxInput}>
                        <View style={styles.fieldLogin}>
                            <TextInput style={styles.emailInput} placeholder='Name' value={name} onChangeText={(value) => setName(value)} />
                            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                        </View>
                        <View style={styles.fieldLogin}>
                            <TextInput style={styles.emailInput} placeholder='Email Address' value={email} onChangeText={(value) => setEmail(value)} />
                            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                        </View>
                        <View style={styles.fieldLogin}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder='Password'
                                secureTextEntry={!showPassword}
                                value={pass}
                                onChangeText={(value) => setPass(value)}
                            />
                            <TouchableOpacity
                                style={{ height: '100%', width: 30, position: 'absolute', right: 30, top: 0 }}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Image
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode='contain'
                                    source={showPassword ? require('../icons/ic_visible.png') : require('../icons/ic_visibility.png')}
                                />
                            </TouchableOpacity>
                            {errors.pass && <Text style={styles.errorText}>{errors.pass}</Text>}
                        </View>
                        <View style={styles.fieldLogin}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder='Re-type Password'
                                secureTextEntry={!showRetypePassword}
                                value={retypePass}
                                onChangeText={(value) => setRetypePass(value)}
                            />
                            <TouchableOpacity
                                style={{ height: '100%', width: 30, position: 'absolute', right: 30, top: 0 }}
                                onPress={() => setShowRetypePassword(!showRetypePassword)}
                            >
                                <Image
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode='contain'
                                    source={showRetypePassword ? require('../icons/ic_visible.png') : require('../icons/ic_visibility.png')}
                                />
                            </TouchableOpacity>
                            {errors.retypePass && <Text style={styles.errorText}>{errors.retypePass}</Text>}
                        </View>
                    </View>
                    <View style={styles.RegisterField}>
                        <TouchableOpacity style={styles.RegisterButton} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.LoginField}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                color: '#a5a8a7',
                                fontSize: 15,
                                fontWeight: 'bold',
                                marginEnd: 5
                            }}>You have an account? Click</Text>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Login')
                            }}>
                                <Text style={{ color: 'orange', fontSize: 15, fontWeight: 'bold' }}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

export default Register;

const styles = StyleSheet.create({
    bgLogin: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    boxInput: {
        width: '100%',
        height: '30%',
        marginTop: 0.05 * deviceHeight,
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
        width: '100%',
        marginVertical: 5,
    },
    emailInput: {
        backgroundColor: '#fff',
        height: 55,
        width: '100%',
        borderWidth: 1,
        borderColor: '#7a7d82',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    passwordInput: {
        backgroundColor: '#fff',
        height: 55,
        width: '100%',
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
    RegisterField: {
        width: '100%',
        height: '20%',
        marginTop: 0.07 * deviceHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    RegisterButton: {
        width: '85%',
        height: '30%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00b56bbf',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    LoginField: {
        flex: 1,
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontWeight: '700',
        backgroundColor: '#ccc',
        borderRadius: 7,
        padding: 3,
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});
