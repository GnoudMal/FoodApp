// import 'react-native-gesture-handler';
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Login from './login'
import Home from './Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Register from './Register';
import FoodDetail from '../components/FoodDetail';
import Setting from './Setting';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Favourite from './Favourite';
import Cart from './Cart';
import Payment from './Payment';
import Contact from './Contact';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Personal from './Personal';
import PlashScreen from './PlashScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const HomeScreen = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                height: 60,
                // borderRadius: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
            },
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'HomeTab') {
                    return <Icon2 name='home' size={size} color={focused ? 'coral' : '#676767'} />
                } else if (route.name === 'Cart') {
                    return <Icon name='shopping-cart' size={size} color={focused ? 'coral' : '#676767'} />
                } else if (route.name === 'Setting') {
                    return <Icon3 name='settings-sharp' size={size} color={focused ? 'coral' : '#676767'} />
                } else if (route.name === 'Favourite') {
                    return <Icon name='heart' size={size} color={focused ? 'coral' : '#676767'} />
                }
            },
        })}>
            <Tab.Screen name="HomeTab" component={Home} />
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen name="Favourite" component={Favourite} />
            <Tab.Screen name="Setting" component={Setting} />


        </Tab.Navigator>
    );
}

const RootComponent = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                setIsAuthenticated(userToken !== null);
            } catch (error) {
                console.error('Lỗi kiểm tra trạng thái đăng nhập:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0C0F14' }}>
            <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
            <NavigationContainer>
                <Stack.Navigator initialRouteName={isAuthenticated ? "Home" : "Login"} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="FoodDetail" component={FoodDetail} />
                    <Stack.Screen name="Contact" component={Contact} />
                    <Stack.Screen name="Payment" component={Payment} />
                    <Stack.Screen name="Personal" component={Personal} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

export default RootComponent;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0C0F14'
    },
});
