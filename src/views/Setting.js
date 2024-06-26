import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/header'
import { SafeAreaView } from 'react-native-safe-area-context'
import TabSettings from '../components/TabSetting'


const Setting = () => {



    return (
        <SafeAreaView style={styles.bgSetting}>
            <Header headerText={"Setting"} />
            <View style={{ marginBottom: 20 }}></View>
            {/* <TabSettings icon={'history'} method={'History'} /> */}
            <TabSettings icon={'user-circle'} method={'Personal Details'} nav={'Personal'} />
            <TabSettings icon={'commenting'} method={'Contact'} nav={'Contact'} />
            <TabSettings icon={'sign-out'} method={'Log Out'} nav={'Login'} />
        </SafeAreaView>
    )
}

export default Setting

const styles = StyleSheet.create({
    bgSetting: {
        flex: 1,
        backgroundColor: '#0C0F14',
    },
})