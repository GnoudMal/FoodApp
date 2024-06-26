import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, Touchable, TouchableOpacity } from 'react-native';
import Header from '../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (!name || !email || !message) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);
        setName('');
        setEmail('');
        setMessage('');
        Alert.alert('Success', 'Your message has been sent successfully.');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.header}>Contact</Text>
            </View>
            <View style={{ justifyContent: 'center', backgroundColor: 'rgba(191, 170, 181, 0.8)', padding: 15, borderRadius: 15 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                />
                <TextInput
                    style={[styles.input, { height: 100 }]}
                    placeholder="Message"
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    multiline
                />
                <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Contact;

const styles = StyleSheet.create({
    header: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    container: {

        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#0C0F14',
    },
    input: {
        fontSize: 17,
        borderRadius: 10,
        color: '#00000',
        height: 40,
        // borderColor: '#D17842',
        borderWidth: 2,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        elevation: 8
    },
    btnSubmit: {
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: '#D17842',
        padding: 15,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    }
});
