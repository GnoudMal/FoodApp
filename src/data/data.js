export const Categories = [
    {
        id: "01",
        category: "All"
    },
    {
        id: "02",
        category: "Fast Food"
    },
    {
        id: "03",
        category: "Popular Dishes"
    },
    {
        id: "04",
        category: "Local Specialties"
    },
    {
        id: "05",
        category: "Vegetarian/Vegan Options"
    },
    {
        id: "06",
        category: "Dietary/Healthy Options"
    },
    {
        id: "07",
        category: "Beverages"
    },
    {
        id: "08",
        category: "Desserts"
    },
    {
        id: "09",
        category: "Combos or Meal Deals"
    },
    {
        id: "10",
        category: "Kids Menu"
    },
    {
        id: "11",
        category: "Party or Group Orders"
    }
];

export const foodItems = [
    {
        id: "001",
        name: "Hamburger",
        category: "Fast Food",
        description: "A classic American fast food item consisting of a grilled beef patty, topped with lettuce, tomato, onion, and condiments, served in a bun.",
        price: 6.99,
        image: require('../images/hamburger.jpeg'),
        ingredients: ["Beef patty", "Lettuce", "Tomato", "Onion", "Bun"],
        allergens: ["Gluten", "Soy"],
        servingSize: "1 burger",
        isVegetarian: false,
        isSpicy: false,
        sale: false
    },
    {
        id: "002",
        name: "Sushi",
        category: "Popular Dishes",
        description: "A Japanese dish consisting of vinegared rice combined with various ingredients such as raw fish, seafood, and vegetables.",
        price: 15.99,
        image: require('../images/sushi.jpeg'),
        ingredients: ["Sushi rice", "Raw fish", "Seafood", "Vegetables"],
        allergens: ["Fish", "Shellfish"],
        servingSize: "1 plate",
        isVegetarian: false,
        isSpicy: false,
        sale: true
    },
    {
        id: "003",
        name: "Pizza Margherita",
        category: "Vegetarian/Vegan Options",
        description: "A classic Italian pizza topped with tomato sauce, mozzarella cheese, and fresh basil leaves.",
        price: 12.99,
        image: require('../images/Pizza_Margherita.png'),
        ingredients: ["Tomato sauce", "Mozzarella cheese", "Basil", "Olive oil"],
        allergens: ["Gluten", "Dairy"],
        servingSize: "1 pizza",
        isVegetarian: true,
        isSpicy: false,
        sale: false
    },
    {
        id: "004",
        name: "Caesar Salad",
        category: "Dietary/Healthy Options",
        description: "A salad made from romaine lettuce and croutons, dressed with Parmesan cheese, lemon juice, olive oil, egg, Worcestershire sauce, garlic, and black pepper.",
        price: 9.99,
        image: require('../images/Caesar_Salad.png'),
        ingredients: ["Romaine lettuce", "Croutons", "Parmesan cheese", "Lemon juice", "Olive oil", "Egg", "Worcestershire sauce", "Garlic", "Black pepper"],
        allergens: ["Gluten", "Dairy", "Egg"],
        servingSize: "1 bowl",
        isVegetarian: true,
        isSpicy: false,
        sale: true
    },
    {
        id: "005",
        name: "Smoothie",
        category: "Beverages",
        description: "A thick, smooth drink made from pureed fruit, yogurt, milk, and ice.",
        price: 4.99,
        image: require('../images/smoothie.png'),
        ingredients: ["Fruit", "Yogurt", "Milk", "Ice"],
        allergens: ["Dairy"],
        servingSize: "1 cup",
        isVegetarian: true,
        isSpicy: false,
        sale: false
    },
    {
        id: "006",
        name: "Phở Bò",
        category: "Popular Dishes",
        description: "A Vietnamese soup consisting of broth, rice noodles, herbs, and beef.",
        price: 8.99,
        image: require('../images/pho_bo.jpg'),
        ingredients: ["Beef", "Rice noodles", "Herbs", "Broth"],
        allergens: ["Gluten", "Soy"],
        servingSize: "1 bowl",
        isVegetarian: false,
        isSpicy: true,
        sale: false
    },
    {
        id: "007",
        name: "Pad Thai",
        category: "Popular Dishes",
        description: "A stir-fried rice noodle dish commonly served as a street food and at most restaurants in Thailand.",
        price: 10.99,
        image: require('../images/pad_thai.png'),
        ingredients: ["Rice noodles", "Tofu", "Shrimp", "Bean sprouts", "Egg"],
        allergens: ["Peanuts", "Soy"],
        servingSize: "1 plate",
        isVegetarian: false,
        isSpicy: true,
        sale: false
    },
    {
        id: "008",
        name: "Margherita Pizza",
        category: "Popular Dishes",
        description: "A classic pizza made with tomato, mozzarella cheese, basil, and olive oil.",
        price: 12.99,
        image: require('../images/Pizza_Margherita.png'),
        ingredients: ["Tomato sauce", "Mozzarella cheese", "Basil", "Olive oil"],
        allergens: ["Gluten", "Dairy"],
        servingSize: "1 pizza",
        isVegetarian: true,
        isSpicy: false,
        sale: true
    },
];


export const cartItems = [
    {
        name: "Hamburger",
        category: "Fast Food",
        price: 6.99,
        quantityS: 1,
        quantityM: 0,
        quantityL: 0,
        image: require('../images/hamburger.jpeg')
    },
    {
        name: "Pizza Margherita",
        category: "Vegetarian/Vegan Options",
        price: 12.99,
        quantityS: 0,
        quantityM: 1,
        quantityL: 0,
        image: require('../images/Pizza_Margherita.png')
    },
    {
        name: "Smoothie",
        category: "Beverages",
        price: 4.99,
        quantityS: 1,
        quantityM: 2,
        quantityL: 1,
        image: require('../images/smoothie.png')
    }
];

export const favourites = [
    {
        id: "001",
        name: "Hamburger",
        description: "A classic American fast food item consisting of a grilled beef patty, topped with lettuce, tomato, onion, and condiments, served in a bun.",
        category: "Fast Food",
        price: 6.99,
        image: require('../images/hamburger.jpeg'),
        sale: true
    },
    {
        id: "002",
        name: "Sushi",
        description: "A Japanese dish consisting of vinegared rice combined with various ingredients such as raw fish, seafood, and vegetables.",
        category: "Popular Dishes",
        price: 15.99,
        image: require('../images/sushi.jpeg'),
        sale: true
    },
    {
        id: "005",
        name: "Smoothie",
        description: "A classic Italian pizza topped with tomato sauce, mozzarella cheese, and fresh basil leaves.",
        category: "Beverages",
        price: 4.99,
        image: require('../images/smoothie.png'),
        sale: false
    }
];

