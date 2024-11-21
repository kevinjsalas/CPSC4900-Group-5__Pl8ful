import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { FontAwesome } from '@expo/vector-icons';
import styles from "../app/styleSheets/styles";
import { getAllRestaurants } from './DatabaseCalls'

// Mock function to fetch restaurant data
export const fetchRestaurant = async () => {
    return [
        { rid: 1, name: "Alleia", location: "25 E Main St, Chattanooga, TN 37408", hours: "M-F: 5 - 9PM", rating: 4 },
        { rid: 2, name: "STIR", location: "1444 Market St, Chattanooga, TN 37402", hours: "M-F: 11AM - 9PM", rating: 4 },
        { rid: 3, name: "Upscale Chophouse", location: "491 Riverfront Pkwy, Chattanooga, TN 37402", hours: "M-F: 11AM - 12AM", rating: 4 },
        { rid: 4, name: "Scottie's On The River", location: "491 Riverfront Pkwy, Chattanooga, TN 37402", hours: "M-F: 11AM - 12AM", rating: 4 },
        { rid: 5, name: "Bridgeman's Chophouse", location: "107 W M.L.K. Blvd, Chattanooga, TN 37402", hours: "M-F: 5-10PM", rating: 4 },
        { rid: 6, name: "Tony's Pasta Shop", location: "212 High St, Chattanooga, TN 37403", hours: "M-F: 11AM - 10PM", rating: 4 },
    ];
};

// RestaurantCard component
const RestaurantCard = () => {
    const [restaurant, setRestaurant] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            const data = await getAllRestaurants();
            setRestaurant(data);
            console.log(data)
            // Add in a way to sort after restaurant data is recieved
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
                            rid: item.rid,
                            name: item.name ?? '',
                            address: item.address ?? '',
                            hours: item.hours ?? '',
                            rating: item.rating ?? null,
                        } 
                    })
                }>
                <View>
                    <Text style={styles.linkHeader}>{item.name}</Text>
                    <View style={styles.linkLocation}>
                        <EvilIcons name="location" size={20} color="#34404D" />
                        <Text style={styles.linkText}>{item.address}</Text>
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
                keyExtractor={(item) => item.rid != null ? item.rid.toString() : ''}
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
