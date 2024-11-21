import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { FontAwesome } from '@expo/vector-icons';
import favoritesStyles from "../app/styleSheets/favoritesStyles";
import { auth } from "../firebaseConfig";
import { getFavoriteRestaurants } from './DatabaseCalls'


const FavoritesCard = () => {
    const [restaurant, setRestaurant] = useState([]);
    const [refreshing, setRefreshing] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const user = auth.currentUser;

    useEffect(() => {
        setIsLoading(true)
        const loadData = async () => {
            const data = await getFavoriteRestaurants(user.uid);
            setRestaurant(data);
            // Add in a way to sort after restaurant data is recieved
            setIsLoading(false)
        };
        loadData();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        // Simulate data fetching
        const data = await getFavoriteRestaurants(user.uid);
        setRestaurant(data);
        setRefreshing(false);
    };
    

    const renderRestaurant = ({ item }) => {
        return (
            <TouchableOpacity 
                style={favoritesStyles.linkButton} 
                onPress={() => 
                    router.push({
                        pathname: "/restaurant", 
                        params: { 
                            name: item.name,
                            location: item.address,
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
                        <Text style={favoritesStyles.linkText}>{item.address}</Text>
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
                {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
                <Text style={[favoritesStyles.linkHeader, { marginBottom: 100 }]}>No Favorites</Text>
                }
            </View>
        ) : (
            <View>
                {isLoading ? <ActivityIndicator size="large" color="#34404D" /> :
                    <FlatList
                    data={restaurant}
                    renderItem={renderRestaurant}
                    keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    />
                }
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