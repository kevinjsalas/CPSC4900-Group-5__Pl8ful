import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";

getFavoritesKey = (userId) => `user_favorites_${userId}`;

export const saveFavorite = async (restaurant, userId) => {
    try {
        const existingFavorites = await getFavorites(userId);
        console.log("Existing favorites1: ", existingFavorites);
        const isFavorite = existingFavorites.some((fav) => fav.rid === restaurant.rid);

        let updatedFavorites;

        if (isFavorite) {
            updatedFavorites = existingFavorites.filter((fav) => fav.rid !== restaurant.rid);
        } else {
            updatedFavorites = [...existingFavorites, restaurant];
        }
        await AsyncStorage.setItem(getFavoritesKey(userId), JSON.stringify(updatedFavorites));
        console.log("Updated favorites: ", updatedFavorites);
    } catch (error) {
        console.error('Error updating favorites: ', error);
    }
};

export const removeFavorite = async (restaurant, userId) => {
    try {
        const existingFavorites = await getFavorites(userId);
        const updatedFavorites = existingFavorites.filter((fav) => fav.id !== restaurant.rid);
        await AsyncStorage.setItem(getFavoritesKey(userId), JSON.stringify(updatedFavorites));
    } catch (error) {
        console.error('Error removing favorite: ', error);
    }
};

export const getFavorites = async (userId) => {
    try {
        const favorites = await AsyncStorage.getItem(getFavoritesKey(userId));
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error('Error getting favorites: ', error);
        return [];
    }
};

const isFavorite = async (restaurantId, userId) => {
    try {
        const favorites = await getFavorites(userId);

        const exists = favorites.some(fav => fav.id === restaurantId);

        if (exists) {
            console.log("Restaurant is already in favorites.");
        } else {
            console.log("Restaurant is not in favorites.");
        }

        return exists;
    } catch (error) {
        console.error("Failed to check if restaurant is favorite:", error);
        return false;
    }
};


export const checkFavorite = async (restaurantId, userId) => {
    const isFav = await isFavorite(restaurantId, userId);
    if (isFav) {
        return true;
    } else {
        return false;
    }
};

