import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PlashScreen = () => {
    return (
        <ImageBackground style={styles.bgLogin} source={require('../images/bg_login.jpg')}>
            <Text>PlashScreen</Text>
        </ImageBackground>
    )
}

export default PlashScreen

const styles = StyleSheet.create({})