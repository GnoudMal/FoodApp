import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Categories } from '../data/data'

const CategoriesList = ({ onSelectCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryPress = (index) => {
        setSelectedCategory(index);
        onSelectCategory(Categories[index].category);
    };
    return (
        <View style={{ paddingHorizontal: 10 }}>
            <ScrollView horizontal>
                {Categories.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            // onPress={() => onSelectCategory(item.category)}
                            onPress={() => handleCategoryPress(index)}
                            style={styles.category}
                        >
                            <Text style={[styles.txtCategory, index === selectedCategory ? styles.selectedCategory : null]}>
                                {item.category}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    )
}

export default CategoriesList

const styles = StyleSheet.create({
    category: {
        marginVertical: 10,
        borderColor: '#52555A',
        borderEndWidth: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    txtCategory: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#52555A',
    },
    firstCategory: {
        color: '#f58a49',
        fontSize: 20,
        marginLeft: 0,
    },
    selectedCategory: {
        color: '#f58a49',
        fontSize: 20,
        marginLeft: 0,
    },
})
