import axios from 'axios';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, ScrollView, Pressable, StatusBar, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ConfirmDialog from './confirmDialog';

const { width } = Dimensions.get('window');

const FoodDetail = ({ navigation, route }) => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [messageDialog, setMessageDialog] = useState(false);
    const [showIngredients, setShowIngredients] = useState(false);
    const [showAllergens, setShowAllergens] = useState(false);
    const [choiceSize, setChoiceSize] = useState('');
    const [favourite, setFavourite] = useState(false)
    const { item } = route.params;

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


    const sizes = ['S', 'M', 'L'];

    const toggleIngredients = () => {
        setShowIngredients(!showIngredients);
    };

    const toggleAllergens = () => {
        setShowAllergens(!showAllergens);
    };

    const handleSizeSelection = (size) => {
        setChoiceSize(size);
    };

    const addToCart = async (foodItem) => {
        if (!choiceSize) {
            setDialogVisible(true);
            setMessageDialog('Vui Lòng Chọn Size');

            return;
        }
        try {
            const cartResponse = await axios.get('https://6662d53d62966e20ef0a33d4.mockapi.io/Cart');
            const cartItems = cartResponse.data;

            let existingCartItem = cartItems.find(cartItem => cartItem.foodId === foodItem.id);

            let quantityS = 0;
            let quantityM = 0;
            let quantityL = 0;

            switch (choiceSize) {
                case 'S':
                    quantityS = 1;
                    break;
                case 'M':
                    quantityM = 1;
                    break;
                case 'L':
                    quantityL = 1;
                    break;
                default:
                    break;
            }

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    quantityS: existingCartItem.quantityS + quantityS,
                    quantityM: existingCartItem.quantityM + quantityM,
                    quantityL: existingCartItem.quantityL + quantityL,
                };

                const response = await axios.put(`https://6662d53d62966e20ef0a33d4.mockapi.io/Cart/${existingCartItem.id}`, updatedItem);
                console.log('Food updated in cart:', response.data);
            } else {
                // Add a new cart item
                const response = await axios.post('https://6662d53d62966e20ef0a33d4.mockapi.io/Cart', {
                    foodId: foodItem.id,
                    name: foodItem.name,
                    price: foodItem.price,
                    image: foodItem.image,
                    category: foodItem.category,
                    quantityS: quantityS,
                    quantityM: quantityM,
                    quantityL: quantityL,
                });
                console.log('Food added to cart:', response.data);
            }
            setDialogVisible(true);
            setMessageDialog('Đã Thêm Vào Giỏ Hàng Thành Công!!')
        } catch (error) {
            console.error('Error adding or updating food in cart:', error);
        }
    };

    const addToFavourite = async (foodItem) => {
        let item = {
            description: foodItem.description,
            name: foodItem.name,
            category: foodItem.category,
            price: foodItem.price,
            image: foodItem.image,
            sale: foodItem.sale
        }

        try {
            const res = axios.post('https://6662d53d62966e20ef0a33d4.mockapi.io/favourites', item);
            console.log('Food added to favourites:', res.data);
            setFavourite(true);
        } catch (err) {
            console.error('Error adding food to favourites:', error);
        }
    }

    const handleConfirm = async () => {
        navigation.goBack();
    };

    const handleCancel = () => {
        setDialogVisible(false);
    };
    console.log('Item received in FoodDetail:', item);

    return (
        <ImageBackground style={{ flex: 1 }} source={getImageSource(item.image)} resizeMode='cover'>
            <View style={{ marginTop: StatusBar.currentHeight, flexDirection: 'row', marginHorizontal: 15 }}>
                <Pressable style={{ flex: 1 }} onPress={() => navigation.goBack()} >
                    <Icon name='arrow-circle-left' size={30} color='white' ></Icon>
                </Pressable>


                <TouchableOpacity onPress={() => !favourite && addToFavourite(item)} style={{ height: '100%', width: 30, position: 'absolute', right: 30, top: 0 }}>
                    <Icon name={favourite ? 'heart' : 'heart-o'} size={30} color={favourite ? 'red' : 'white'}></Icon>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.contentBox}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemCategory}>{item.category}</Text>
                    <View style={{ height: 100 }}>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleIngredients}>
                            <Text style={styles.buttonText}>Show Ingredients</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={toggleAllergens}>
                            <Text style={styles.buttonText}>Show Allergens</Text>
                        </TouchableOpacity>
                    </View>

                    {showIngredients && (
                        <View style={styles.ingredientsContainer}>
                            {item.ingredients.map((ingredient, index) => (
                                <Text key={index} style={styles.ingredient}>
                                    + {ingredient}
                                </Text>
                            ))}
                        </View>
                    )}

                    {showAllergens && (
                        <View style={styles.allergensContainer}>
                            {item.allergens.map((allergen, index) => (
                                <Text key={index} style={styles.allergen}>
                                    + {allergen}
                                </Text>
                            ))}
                        </View>
                    )}

                    <View style={styles.sizeField}>
                        <Text style={styles.sizeTitle}>Size</Text>
                        <View style={styles.sizeContainer}>
                            {sizes.map((size, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.sizeBox, choiceSize === size && { borderColor: '#FFC107' }]}
                                    onPress={() => handleSizeSelection(size)}
                                >
                                    <Text style={styles.sizeText}>
                                        {size}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.totalField}>
                        <View style={styles.priceField}>
                            <Text style={{ fontSize: 18, color: '#AEAEAE' }}>Price</Text>
                            <Text style={styles.txtPrice}><Text style={{ color: '#FFC107' }}>$</Text> {item.price}</Text>
                        </View>
                        <Pressable style={styles.btnAdd} onPress={() => addToCart(item)}>
                            <Text style={{
                                color: '#000', fontSize: 20,
                                fontWeight: 'bold'
                            }}>Add to Cart</Text>
                        </Pressable>
                        <ConfirmDialog
                            visible={dialogVisible}
                            // onConfirm={handleConfirm}
                            onCancel={handleCancel}
                            message={messageDialog}
                        />
                    </View>

                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default FoodDetail;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentBox: {
        flex: 1,
        marginTop: 275,
        borderTopLeftRadius: 55,
        borderTopRightRadius: 55,
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        overflow: 'hidden',
        backgroundColor: 'rgba(2, 2, 2, 0.5)',
        width: '100%',
    },
    itemName: {
        fontSize: 45,
        fontFamily: 'FS Harabara',
        color: '#fff',
        marginTop: 20,
    },
    itemCategory: {
        fontSize: 18,
        color: '#000000',
        marginTop: 5,
        fontWeight: '700',
        backgroundColor: 'rgba(234, 221, 228, 0.8)',
        padding: 5,
        borderRadius: 10,
    },
    itemDescription: {
        fontSize: 16,
        color: '#fff',
        marginTop: 10,
        textAlign: 'auto',
        letterSpacing: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#FFC107',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginRight: 26,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    ingredientsContainer: {
        marginTop: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderRadius: 10,
        width: '100%',
    },
    ingredient: {
        fontSize: 16,
        color: '#000',
        marginVertical: 5,
    },
    allergensContainer: {
        marginTop: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderRadius: 10,
        width: '100%',
    },
    allergen: {
        fontSize: 16,
        color: '#000',
        marginVertical: 5,
    },
    sizeField: {
        marginTop: 15,
        width: '100%',
        height: 75,
    },
    sizeTitle: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
    },
    sizeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    sizeBox: {
        flex: 1,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
    },
    sizeText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    txtPrice: {
        flex: 1,
        marginTop: 5,
        fontSize: 27,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    totalField: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 50,
        flexDirection: 'row',
        width: '100%',
    },
    priceField: {
        paddingBottom: 16,
        flex: 1,
        alignItems: 'flex-start',
    },
    btnAdd: {
        backgroundColor: '#FFC107',
        width: '65%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
});
