import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon3 from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import ConfirmDialog from './confirmDialog';

const CartList = ({ setTotalPrice }) => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [itemIdToRemove, setItemIdToRemove] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const updateCartItem = async (id, updatedItem) => {
        try {
            await axios.put(`https://6662d53d62966e20ef0a33d4.mockapi.io/Cart/${id}`, updatedItem);
        } catch (err) {
            console.log(err);
        }
    };

    const calculateTotalPrice = (item) => {
        const totalPrice =
            item.quantityS * item.price +
            item.quantityM * (item.price + 0.5) +
            item.quantityL * (item.price + 1);
        return totalPrice.toFixed(2);
    };

    const calculateCartTotalPrice = (cartItems) => {
        const total = cartItems.reduce((sum, item) => {
            return sum + parseFloat(item.totalPrice);
        }, 0);
        setTotalPrice(total.toFixed(2));
    };

    const increaseQuantity = (index, size) => {
        const updatedCartItems = [...cartItems];
        switch (size) {
            case 'S':
                updatedCartItems[index].quantityS += 1;
                break;
            case 'M':
                updatedCartItems[index].quantityM += 1;
                break;
            case 'L':
                updatedCartItems[index].quantityL += 1;
                break;
            default:
                break;
        }
        updatedCartItems[index].totalPrice = calculateTotalPrice(updatedCartItems[index]);
        setCartItems(updatedCartItems);
        updateCartItem(updatedCartItems[index].id, updatedCartItems[index]);
        calculateCartTotalPrice(updatedCartItems);
    };

    const decreaseQuantity = (index, size) => {
        const updatedCartItems = [...cartItems];
        switch (size) {
            case 'S':
                if (updatedCartItems[index].quantityS > 0) {
                    updatedCartItems[index].quantityS -= 1;
                }
                break;
            case 'M':
                if (updatedCartItems[index].quantityM > 0) {
                    updatedCartItems[index].quantityM -= 1;
                }
                break;
            case 'L':
                if (updatedCartItems[index].quantityL > 0) {
                    updatedCartItems[index].quantityL -= 1;
                }
                break;
            default:
                break;
        }
        updatedCartItems[index].totalPrice = calculateTotalPrice(updatedCartItems[index]);
        setCartItems(updatedCartItems);
        updateCartItem(updatedCartItems[index].id, updatedCartItems[index]);
        calculateCartTotalPrice(updatedCartItems);
    };



    const fetchCartItems = async () => {
        try {
            const res = await axios.get('https://6662d53d62966e20ef0a33d4.mockapi.io/Cart');
            const updatedCartItems = res.data.map(item => ({
                ...item,
                totalPrice: calculateTotalPrice(item),
            }));
            setCartItems(updatedCartItems);
            calculateCartTotalPrice(updatedCartItems);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, [cartItems]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchCartItems();
        setRefreshing(false);
    };

    const getImageSource = (image) => {
        if (image.startsWith('http')) {
            return { uri: image };
        } else {
            switch (image) {
                case 'hamburger.jpeg':
                    return require('../images/hamburger.jpeg')
                case 'sushi.jpeg':
                    return require('../images/sushi.jpeg')
                case 'Pizza_Margherita.png':
                    return require('../images/Pizza_Margherita.png');
                case 'Caesar_Salad.png':
                    return require('../images/Caesar_Salad.png')
                case 'smoothie.png':
                    return require('../images/smoothie.png')
                case 'pho_bo.jpg':
                    return require('../images/pho_bo.jpg')
                case 'pad_thai.png':
                    return require('../images/pad_thai.png');
                default:
                    return null;
            }
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#00ff00" />;
    }

    const handleRemoveItem = (id) => {
        setItemIdToRemove(id);
        setDialogVisible(true);
    }

    const handleConfirm = async () => {
        try {
            await axios.delete(`https://6662d53d62966e20ef0a33d4.mockapi.io/Cart/${itemIdToRemove}`);
            const res = await axios.get('https://6662d53d62966e20ef0a33d4.mockapi.io/Cart');
            setCartItems(res.data);
            calculateCartTotalPrice(res.data);
        } catch (err) {
            console.log(err);
        }
        setItemIdToRemove(null);
        setDialogVisible(false);
    }

    const handleCancel = () => {
        setDialogVisible(false)
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.name}
                renderItem={({ item, index }) => (
                    <View style={styles.itemCart}>
                        <TouchableOpacity style={styles.removeIconContainer}>
                            <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                                <Icon3 name={'remove-circle'} size={30} color='rgba(233, 165, 64, 0.8)' />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', flex: 1, marginTop: 5 }}>
                            <Image style={styles.imgFood} source={getImageSource(item.image)} />
                            <View>
                                <Text style={styles.txtFood}>{item.name}</Text>
                                <Text style={styles.itemCategory}>{item.category}</Text>
                            </View>
                        </View>
                        <View style={styles.sizesContainer}>
                            {item.quantityS > 0 && (
                                <View style={styles.sizeRow}>
                                    <Text style={styles.sizeBox}>S</Text>
                                    <Text style={styles.txtPrice}><Text style={{ color: '#FFC107' }}>$</Text> {item.price}</Text>
                                    <View style={styles.quantityContainer}>
                                        <TouchableOpacity style={styles.btnCount} onPress={() => decreaseQuantity(index, 'S')}>
                                            <Text style={styles.sizeText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.quantityText}>{item.quantityS}</Text>
                                        <TouchableOpacity style={styles.btnCount} onPress={() => increaseQuantity(index, 'S')}>
                                            <Text style={styles.sizeText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            {item.quantityM > 0 && (
                                <View style={styles.sizeRow}>
                                    <Text style={styles.sizeBox}>M</Text>
                                    <Text style={styles.txtPrice}><Text style={{ color: '#FFC107' }}>$</Text> {(item.price + 0.5).toFixed(2)}</Text>
                                    <View style={styles.quantityContainer}>
                                        <TouchableOpacity style={styles.btnCount} onPress={() => decreaseQuantity(index, 'M')}>
                                            <Text style={styles.sizeText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.quantityText}>{item.quantityM}</Text>
                                        <TouchableOpacity style={styles.btnCount} onPress={() => increaseQuantity(index, 'M')}>
                                            <Text style={styles.sizeText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            {item.quantityL > 0 && (
                                <View style={styles.sizeRow}>
                                    <Text style={styles.sizeBox}>L</Text>
                                    <Text style={styles.txtPrice}><Text style={{ color: '#FFC107' }}>$</Text> {(item.price + 1).toFixed(2)}</Text>
                                    <View style={styles.quantityContainer}>
                                        <TouchableOpacity style={styles.btnCount} onPress={() => decreaseQuantity(index, 'L')}>
                                            <Text style={styles.sizeText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.quantityText}>{item.quantityL}</Text>
                                        <TouchableOpacity style={styles.btnCount} onPress={() => increaseQuantity(index, 'L')}>
                                            <Text style={styles.sizeText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                        <Text style={styles.itemTotalPrice}>Total: $ {item.totalPrice}</Text>
                    </View>
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            />
            <ConfirmDialog
                visible={dialogVisible}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                message="Bạn có muốn xóa sản phẩm khỏi giỏ hàng không ?"
            />
        </View>
    );
}

export default CartList;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        flex: 1,
    },
    itemCart: {
        backgroundColor: '#252A32',
        paddingHorizontal: 12,
        paddingTop: 15,
        paddingBottom: 20,
        marginVertical: 15,
        marginHorizontal: 10,
        borderRadius: 15,
    },
    removeIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    imgFood: {
        width: 125,
        height: 125,
        resizeMode: 'cover',
        borderRadius: 15,
        overflow: 'hidden',
        borderWidth: 2,
    },
    txtFood: {
        color: '#FFFFFF',
        alignSelf: 'flex-start',
        fontSize: 22,
        marginTop: 10,
        fontWeight: 'bold',
        marginHorizontal: 20,
    },
    itemCategory: {
        textAlign: 'center',
        marginHorizontal: 20,
        fontSize: 12,
        color: '#000000',
        marginTop: 5,
        fontWeight: '500',
        backgroundColor: 'rgba(234, 221, 228, 0.8)',
        padding: 5,
        borderRadius: 10,
    },
    itemTotalPrice: {
        textAlign: 'center',
        marginHorizontal: 20,
        fontSize: 20,
        color: 'white',
        marginTop: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: 'rgba(233, 165, 64, 0.8)',
        borderWidth: 2,
        padding: 5,
        borderRadius: 10,
        fontWeight: 'bold',
    },
    sizesContainer: {
        marginTop: 15,
        marginHorizontal: 20,
    },
    sizeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sizeText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    sizeBox: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        width: 70,
        height: 35,
        borderColor: 'rgba(233, 165, 64, 0.8)',
        borderWidth: 2,
        borderRadius: 10,
        textAlign: 'center',
        lineHeight: 35,
    },
    txtPrice: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
        paddingHorizontal: 17,
    },
    btnCount: {
        width: 35,
        height: 35,
        backgroundColor: 'rgba(233, 165, 64, 0.8)',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
