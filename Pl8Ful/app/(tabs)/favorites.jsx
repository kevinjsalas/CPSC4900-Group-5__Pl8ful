import { useEffect, useState } from "react";
import { View, Text, FlatList, Button, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import favoritesStyles from "../styleSheets/favoritesStyles";
import FavoritesCard from "../../components/FavoritesCard";

const FavoritesScreen = () => {

    return (
        <View style={favoritesStyles.container}>
            <ImageBackground
                source={{ uri: 'https://marketplace.canva.com/EAFA7Zl1wfs/1/0/1600w/canva-pastel-red-green-illustrative-element-centric-video-background-Rs7EVOqIM2c.jpg' }}
                style={favoritesStyles.topBar}
                resizeMode="cover"
            />
            <Text style={favoritesStyles.pageTitle}>Favorites</Text>
            <FavoritesCard />
        </View>
    );
};

export default FavoritesScreen;