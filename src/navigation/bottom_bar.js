import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../views/Home';
import Setting from '../views/Setting';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator>
            {/* <Tab.Screen name="Home" component={Home} /> */}
            <Tab.Screen name="Setting" component={Setting} />
        </Tab.Navigator>
    )
}

export default Tabs

const styles = StyleSheet.create({})
