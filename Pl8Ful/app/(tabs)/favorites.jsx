import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import favoritesStyles from "../styleSheets/favoritesStyles";
import { fetchRestaurant } from "../../components/RestaurantCard";

const FavoritesScreen = () => {
    const [restaurants, setRestaurants] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const loadRestaurants = async () => {
            const fetchedRestaurants = await fetchRestaurant();
            setRestaurants(fetchedRestaurants);
        };

        loadRestaurants();
    }, []);

    return (
        <View style={favoritesStyles.container}>
            {/* Top bar with background image */}
            <ImageBackground
                source={{ uri: 'https://marketplace.canva.com/EAFA7Zl1wfs/1/0/1600w/canva-pastel-red-green-illustrative-element-centric-video-background-Rs7EVOqIM2c.jpg' }}
                style={favoritesStyles.topBar}
                resizeMode="cover"
            >
            </ImageBackground>

            <Text style={favoritesStyles.header}>Favorites</Text>
            <FlatList
                data={restaurants}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={favoritesStyles.card}>
                        <Text style={favoritesStyles.restaurantName}>{item.name}</Text>
                        <Button
                            title="Learn More"
                            onPress={() => router.push(`/restaurant/${item.id}`)}
                        />
                    </View>
                )}
            />
        </View>
    );
};

export default FavoritesScreen;