// ConfirmDialog.js
import React from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const ConfirmDialog = ({ visible, onConfirm, onCancel, message }) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.dialog}>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.btnOption} onPress={onCancel}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Cancel</Text>
                        </TouchableOpacity>
                        {onConfirm && <TouchableOpacity style={styles.btnOption} onPress={onConfirm}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Confirm</Text>
                        </TouchableOpacity>}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(230, 223, 227, 0.21)',
    },
    dialog: {
        width: 320,
        padding: 30,
        backgroundColor: '#0C0F14',
        borderRadius: 20,
        elevation: 5,
    },
    message: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btnOption: {
        backgroundColor: '#D17842',
        padding: 10,
        borderRadius: 15,
    }
});

export default ConfirmDialog;
