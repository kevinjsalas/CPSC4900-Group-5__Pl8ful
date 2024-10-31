import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { FontAwesome } from '@expo/vector-icons';
import styles from "../app/styleSheets/styles";

// Mock function to fetch restaurant data
export const fetchRestaurant = async () => {
    return [
        { id: 1, name: "McDonalds", location: "5.1 mi", hours: "24/7", rating: 5 },
        { id: 2, name: "Burger King", location: "4.8 mi", hours: "24/7", rating: 4.0 },
        { id: 3, name: "Wendy's", location: "8.1 mi", hours: "24/7"},
        { id: 4, name: "Taco Bell", location: "10.3 mi", hours: "24/7", rating: 3.5 },
        { id: 5, name: "KFC", location: "7.2 mi", hours: "24/7", rating: 3.0 }
    ];
};

// RestaurantCard component
const RestaurantCard = () => {
    const [restaurant, setRestaurant] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchRestaurant();
            setRestaurant(data);
        };
        loadData();
    }, []);

    const renderRestaurant = ({ item }) => {
        return (
            <TouchableOpacity 
                style={styles.linkButton} 
                onPress={() => 
                    router.push({
                        pathname: "/restaurant", 
                        params: { 
                            name: item.name,
                            location: item.location,
                            hours: item.hours,
                            rating: item.rating,
                            rid: item.id
                        } 
                    })
                }>
                <View>
                    <Text style={styles.linkHeader}>{item.name}</Text>
                    <View style={styles.linkLocation}>
                        <EvilIcons name="location" size={20} color="#34404D" />
                        <Text style={styles.linkText}>{item.location}</Text>
                    </View>
                    <Text style={styles.linkHours}>Hours: {item.hours}</Text>
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
                name={i < filledStars ? "star" : "star-o"} 
                size={20}
                color="#EC8677"
            />
        );
    }
    return !rating ? <Text>No reviews yet</Text> : <View style={{ flexDirection: 'row' }}>{stars}</View>; // Return stars in a row
};

export default RestaurantCard;
