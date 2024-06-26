import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchFilter from '../components/SearchFilter';
import CategoriesList from '../components/Categories';
import FoodCard from '../components/FoodCard';
import { NavigationContainer } from '@react-navigation/native';
import AxiosInstance from '../../axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Home = () => {
    const [loading, setLoading] = useState(true);
    const [foodItems, setFoodItems] = useState([]);
    const [filteredFoodItems, setFilteredFoodItems] = useState([]);
    const [nameUser, setNameUser] = useState('');

    const searchFoods = async (keyword) => {
        try {
            const response = await AxiosInstance().get(`/foods?name=${keyword}`);
            setFilteredFoodItems(response.data);
        } catch (error) {
            console.error('Error searching for foods:', error);
        }
    };


    useEffect(() => {
        const fetchAvatarUrl = async () => {
            try {
                const storedUserDataString = await AsyncStorage.getItem('UserData');
                if (storedUserDataString) {
                    const storedUserData = JSON.parse(storedUserDataString);
                    setNameUser(storedUserData.name)
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data from AsyncStorage:', error);
                setLoading(false);
            }
        };

        fetchAvatarUrl();
    }, []);

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstance().get('/foods');
                setFoodItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [foodItems]);

    const handleCategorySelect = (category) => {
        const filteredItems = foodItems.filter(item => item.category === category);
        setFilteredFoodItems(filteredItems);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.bgHome}>
            <Header headerText={`Hello, ${nameUser} ✌`} headerIcon={'bell-o'} />
            <SearchFilter hint={'What do you feel like eating tonight?'} icon={'search'} onSearch={searchFoods} />
            <CategoriesList onSelectCategory={handleCategorySelect} />
            <FoodCard foodItems={filteredFoodItems.length > 0 ? filteredFoodItems : foodItems} />
        </SafeAreaView>
    )
}

export default Home;

const styles = StyleSheet.create({
    bgHome: {
        flex: 1,
        backgroundColor: '#0C0F14',
    }
});
