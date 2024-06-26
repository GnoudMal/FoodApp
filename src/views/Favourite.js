import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/header';
import FavouriteFood from '../components/FavouriteFood';

const Favourite = () => {
    return (
        <SafeAreaView style={styles.bgFavourite}>
            <Header headerText={"Favourite"} headerIcon={'bell'} />
            <FavouriteFood />
        </SafeAreaView>
    )
}

export default Favourite

const styles = StyleSheet.create({
    bgFavourite: {
        flex: 1,
        backgroundColor: '#0C0F14',
    },
})