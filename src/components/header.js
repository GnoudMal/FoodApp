import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../../axiosInstance';

const Header = ({ headerText, headerIcon }) => {
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAvatarUrl = async () => {
            try {
                const storedUserDataString = await AsyncStorage.getItem('UserData');
                if (storedUserDataString) {
                    const storedUserData = JSON.parse(storedUserDataString);
                    if (storedUserData.avatar) {
                        setAvatarUrl(storedUserData.avatar);
                    }
                }
                // console.log(avatarUrl);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching avatar URL from AsyncStorage:', error);
                setIsLoading(false);
            }
        };

        fetchAvatarUrl();
    }, []);

    // console.log('linkavt', avatarUrl);
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={{ flexDirection: 'row', marginVertical: 15, marginEnd: 10, justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
            <Image style={{ marginStart: 15, width: 40, height: 40, borderRadius: 15 }} source={{ uri: avatarUrl }} />
            <Text style={{ color: 'white', paddingHorizontal: 15, fontSize: 25, fontWeight: 'bold' }}>{headerText}</Text>
            <Icon name={headerIcon} size={26} color='white' />
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
