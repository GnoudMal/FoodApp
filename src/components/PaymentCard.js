import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PaymentMethod from './PaymentMethod';

const PaymentCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.cardField}>
                <Text style={styles.txtPaymentType}>Credit Card</Text>
                <Image source={require('../images/vard.png')} style={{ width: 350, height: 200 }} />
            </View>
            <PaymentMethod logo={require('../images/viettepay_logo.png')} method={'Viettel Pay'} balance={'214.000 VND'} />
            <PaymentMethod icon={'wallet'} method={'Wallet'} balance={'10.000 VND'} />
            <PaymentMethod icon={'app-store'} method={'Apple Pay'} balance={'$ 214.0'} />

        </View>
    );
}

export default PaymentCard;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    txtPaymentType: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10,
    },
    cardField: {
        marginBottom: 20,
        borderColor: 'coral',
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
    },
});
