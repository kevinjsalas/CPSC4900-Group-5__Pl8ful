import React from "react";
import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import favoritesStyles from "../styleSheets/favoritesStyles";


const FavoritesScreen = () => {
    return (
        <View style={favoritesStyles.container}>
            <View>
                <Text style={favoritesStyles.header}> Favorites </Text>
            </View>
        </View>
    );
};

export default FavoritesScreen;