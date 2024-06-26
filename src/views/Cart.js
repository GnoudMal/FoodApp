import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartList from '../components/CartList';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
    const navigation = useNavigation();
    const [totalPrice, setTotalPrice] = useState(0);

    return (
        <SafeAreaView style={styles.bgCart}>
            <Header headerText="Cart" headerIcon="bell" />
            <CartList setTotalPrice={setTotalPrice} />
            <View style={styles.totalField}>
                <View style={styles.priceField}>
                    <Text style={styles.label}>Price</Text>
                    <Text style={styles.txtPrice}>
                        <Text style={styles.currencySymbol}>$</Text> {totalPrice}
                    </Text>
                </View>
                <Pressable
                    onPress={() => {
                        navigation.navigate('Payment', { item: totalPrice });
                    }}
                    style={styles.btnPay}
                >
                    <Text style={styles.btnPayText}>Pay</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default Cart;

const styles = StyleSheet.create({
    bgCart: {
        flex: 1,
        backgroundColor: '#0C0F14',
    },
    totalField: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderColor: 'rgba(233, 165, 64, 0.8)',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
    },
    priceField: {
        flex: 1,
    },
    btnPay: {
        backgroundColor: 'rgba(233, 165, 64, 0.8)',
        width: '50%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    btnPayText: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    txtPrice: {
        fontSize: 27,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginTop: 5,
    },
    label: {
        fontSize: 15,
        color: '#AEAEAE',
    },
    currencySymbol: {
        color: 'rgba(233, 165, 64, 0.8)',
    },
});
