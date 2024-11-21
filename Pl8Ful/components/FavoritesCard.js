import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { FontAwesome } from '@expo/vector-icons';
import favoritesStyles from "../app/styleSheets/favoritesStyles";
import { auth } from "../firebaseConfig";
import { useFocusEffect } from '@react-navigation/native';
import { getRestaurant } from './DatabaseCalls'


const FavoritesCard = () => {
    const [restaurant, setRestaurant] = useState([]);
    const router = useRouter();
    const user = auth.currentUser;

    // Was previously using AsyncStorage for favorite restaurants.
    // Currently working on switching this over to the Firestore Database
    // Need to pull restaurant data here
    

    const renderRestaurant = ({ item }) => {
        return (
            <TouchableOpacity 
                style={favoritesStyles.linkButton} 
                onPress={() => 
                    router.push({
                        pathname: "/restaurant", 
                        params: { 
                            name: item.name,
                            location: item.location,
                            hours: item.hours,
                            rating: item.rating,
                            rid: item.rid
                        } 
                    })
                }>
                <View>
                    <Text style={favoritesStyles.linkHeader}>{item.name}</Text>
                    <View style={favoritesStyles.linkLocation}>
                        <EvilIcons name="location" size={20} color="#34404D" />
                        <Text style={favoritesStyles.linkText}>{item.location}</Text>
                    </View>
                    <Text style={favoritesStyles.linkHours}>Hours: {item.hours}</Text>
                    <Text style={favoritesStyles.rating}>{starRating(item.rating)}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        user?.uid == null ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[favoritesStyles.linkHeader, { marginBottom: 100 }]}>
                    Please sign in to add favorites
                </Text>
            </View>
        ) : restaurant.length == 0 ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[favoritesStyles.linkHeader, { marginBottom: 100 }]}>No Favorites</Text>
                <TouchableOpacity style={favoritesStyles.linkButton} onPress={() => {}}>
                    <Text>Test functions</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <View>
                <FlatList
                    data={restaurant}
                    renderItem={renderRestaurant}
                    keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
                />
            </View>
        )
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

export default FavoritesCard;