import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AxiosInstance from '../../axiosInstance';
import axios from 'axios';

const FoodCard = ({ foodItems }) => {
    // const [foodItems, setFoodItems] = useState([]);
    // const [loading, setLoading] = useState(true);
    const nav = useNavigation();

    // useEffect(() => {
    //     const dataFoodItems = async () => {
    //         try {
    //             const response = await AxiosInstance().get('/foods');
    //             setFoodItems(response.data);
    //             setLoading(false);
    //         } catch (err) {
    //             console.log(err);
    //             setLoading(false)
    //         }
    //     };
    //     dataFoodItems();
    // }, [foodItems]);

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

    // if (loading) {
    //     return <ActivityIndicator size="large" color="#00ff00" />;
    // }





    return (
        <FlatList
            contentContainerStyle={styles.container}
            data={foodItems}
            renderItem={({ item }) => (
                <Pressable onPress={() => nav.navigate('FoodDetail', { item: item })} style={styles.itemFood}>
                    <View>
                        {item.sale && <Text style={styles.saleText}>Sale</Text>}
                        <Image style={styles.imgFood} source={getImageSource(item.image)} />
                    </View>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <View style={styles.itemInfo}>
                        <Text style={styles.servingSize}>{item.servingSize}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}><Text style={{ color: '#D17842' }}>$</Text> {item.price}</Text>
                            <TouchableOpacity style={styles.btnAdd}><Icon name='plus' size={15} color='white' /></TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            )}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{
                justifyContent: 'space-between'
            }}
            numColumns={2}
        />
    );
}

export default FoodCard;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
    },
    itemFood: {
        flex: 1,
        backgroundColor: '#252A32',
        paddingHorizontal: '2%',
        paddingTop: '3%',
        paddingBottom: '3%',
        marginVertical: '2%',
        marginHorizontal: '2%',
        borderRadius: 15,
        position: 'relative',
    },
    saleText: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#f5272799',
        color: '#FFFFFF',
        width: 53,
        height: 22,
        textAlign: 'center',
        borderBottomLeftRadius: 25,
        zIndex: 1,
        fontWeight: 'bold'
    },
    itemText: {
        color: '#FFFFFF',
        alignSelf: 'flex-start',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    },
    imgFood: {
        width: '100%',
        height: 155,
        resizeMode: 'cover',
        borderRadius: 15,
        overflow: 'hidden',
        borderWidth: 2,
    },
    itemInfo: {
        marginTop: 7,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    servingSize: {
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: 'bold',
        justifyContent: 'center'
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    price: {
        flex: 1,
        marginTop: 5,
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    btnAdd: {
        backgroundColor: '#D17842',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    }
});
