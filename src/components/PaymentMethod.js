import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/Ionicons';

const PaymentMethod = ({ method, logo, icon, balance }) => {
    return (
        <View style={styles.container}>
            {icon && <Icon2 style={styles.iconMethod} name={icon} size={40} color='#D17842' />}
            {logo && <Image style={styles.imgLogo} source={logo} />}
            <Text style={styles.txtMethod}>{method}</Text>
            <Text style={{ color: 'white', fontWeight: 600, fontSize: 16 }}>{balance}</Text>
        </View >
    )
}

export default PaymentMethod

const styles = StyleSheet.create({
    iconMethod: {
        marginStart: 5,
        marginRight: 10,
    },
    imgLogo: {
        width: 55,
        height: 55,
        marginRight: 10
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
        paddingVertical: 10
    }
})