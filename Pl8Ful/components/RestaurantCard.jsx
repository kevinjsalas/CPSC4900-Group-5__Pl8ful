import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { router } from "expo-router";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { FontAwesome } from '@expo/vector-icons';
import styles from "../app/styleSheets/styles";

// Mock function to fetch restaurant data
const fetchRestaurant = async () => {
    return [
        { id: 1, name: "McDonalds", location: "123 Fake St", hours: "24/7", rating: 4.5 },
        { id: 2, name: "Burger King", location: "456 Real St", hours: "24/7", rating: 4.0 },
        { id: 3, name: "Wendy's", location: "789 Imaginary St", hours: "24/7"},
        { id: 4, name: "Taco Bell", location: "012 Madeup St", hours: "24/7", rating: 3.5 },
        { id: 5, name: "KFC", location: "345 Fictional St", hours: "24/7", rating: 3.0 }
    ];
};

// RestaurantCard component
const RestaurantCard = () => {
    const [restaurant, setRestaurant] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchRestaurant();
            setRestaurant(data);
        };
        loadData();
    }, []);

    const renderRestaurant = ({ item }) => {
        return (
            <TouchableOpacity style={styles.linkButton} onPress={() => { router.push('./') }}>
                <View>
                    <Text style={styles.linkHeader}>{item.name}</Text>
                    <View style={styles.linkLocation}>
                        <EvilIcons name="location" size={20} color="#34404D" />
                        <Text style={styles.linkText}>{item.location}</Text>
                    </View>
                    <Text style={styles.linkText}>Hours: {item.hours}</Text>
                    <Text style={styles.rating}>{starRating(item.rating)}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <FlatList
                data={restaurant}
                renderItem={renderRestaurant}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const starRating = (rating) => {
    const filledStars = Math.floor(rating);
    const totalStars = 5;
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
        stars.push(
            <FontAwesome
                key={i}
                name={i < filledStars ? "star" : "star-o"} // Use filled or empty star
                size={20}
                color="#EC8677"
            />
        );
    }
    return !rating ? <Text>No reviews yet</Text> : <View style={{ flexDirection: 'row' }}>{stars}</View>; // Return stars in a row
};

export default RestaurantCard;
