// TabSettings.js
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfirmDialog from './confirmDialog';

const TabSettings = ({ method, icon, nav }) => {
    const navigation = useNavigation();
    const [dialogVisible, setDialogVisible] = useState(false);

    const handlePress = () => {
        if (method === 'Log Out') {
            setDialogVisible(true);
        } else {
            navigation.navigate(nav);
        }
    };

    const handleConfirm = async () => {
        setDialogVisible(false);
        await AsyncStorage.removeItem('userToken');
        navigation.navigate('Login');
    };

    const handleCancel = () => {
        setDialogVisible(false);
    };

    return (
        <>
            <Pressable style={styles.container} onPress={handlePress}>
                {icon && <Icon style={styles.iconMethod} name={icon} size={35} color='#D17842' />}
                <Text style={styles.txtMethod}>{method}</Text>
                <Icon2 name='chevron-right' size={35} color='white' />
            </Pressable>
            <ConfirmDialog
                visible={dialogVisible}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                message="Are you sure you want to log out?"
            />
        </>
    );
};

export default TabSettings;

const styles = StyleSheet.create({
    iconMethod: {
        marginStart: 5,
        marginRight: 10,
    },
    txtMethod: {
        flex: 1,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    container: {
        paddingHorizontal: 10,
        borderRadius: 17,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#262B33',
        marginBottom: 20,
        paddingVertical: 20,
        marginHorizontal: 10,
    },
});
