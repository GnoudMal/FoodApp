import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/header';
import PaymentCard from '../components/PaymentCard';
import ConfirmDialog from '../components/confirmDialog';

const Payment = ({ route, navigation }) => {
    const [showDialog, setShowDialog] = useState(false)
    const { item } = route.params;
    console.log('Received item:', item);

    const handleConfirm = () => {
        navigation.navigate('Home')
        setShowDialog(false)
    }
    const handleCancel = () => {
        setShowDialog(false)
    }

    return (
        <SafeAreaView style={styles.bgFavourite}>
            <Header headerText="Payment" />
            <PaymentCard />
            <View style={styles.totalField}>
                <View style={styles.priceField}>
                    <Text style={styles.label}>Price</Text>
                    <Text style={styles.txtPrice}>
                        <Text style={styles.currencySymbol}>$</Text> {item}
                    </Text>
                </View>
                <Pressable style={styles.btnPay} onPress={() => setShowDialog(true)}>
                    <Text style={styles.btnPayText}>Pay</Text>
                </Pressable>
            </View>
            <ConfirmDialog
                visible={showDialog}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                message="Bạn có muốn Xác Nhận Thanh Toán ?"
            />
        </SafeAreaView>
    );
};

export default Payment;

const styles = StyleSheet.create({
    bgFavourite: {
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
        borderColor: 'coral',
        position: 'absolute',
        bottom: 0,
    },
    priceField: {
        flex: 1,
    },
    btnPay: {
        backgroundColor: 'coral',
        width: '45%',
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
