import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TextInput, ImageBackground } from 'react-native';
import styles from '../styleSheets/styles';
import RestaurantCard from '@/components/RestaurantCard';

const restaurantData = [
  {id: "1", name: "Aleia"},
  {id: "2", name: "McDonald's"},
  {id: "3",  name: "Bridgeman's Chophouse"},
  {id : "4", name: "Scottie's on the River"},
  {id : "5", name: "Stir"},
  {id : "6", name: "Tony's Pasta Shop"},
  {id : "7", name: "Upscale Chophouse"}
];

export default function HomePage() {

  const [searchQuery, setSearchQuery] = useState("")
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantData);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = restaurantData.filter((restaurant) => 
    restaurant.name.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredRestaurants(filtered); 

  };

  return (
    <View style={styles.container}>
      {/* Top bar for the homepage */}
      <ImageBackground
        source={{ uri: 'https://marketplace.canva.com/EAFA7Zl1wfs/1/0/1600w/canva-pastel-red-green-illustrative-element-centric-video-background-Rs7EVOqIM2c.jpg' }}
        style={styles.topBar}
        resizeMode="cover"
      />
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          StackNavigator
          placeholder="Search for restaurants"
          placeholderTextColor="#888"
        />
      </View>
      <Text style={styles.pageTitle}> Popular Restaurants </Text>
      {/* Restaurant sections with 5-star rating */}
      <View style={styles.linksContainer}>
        <RestaurantCard /> 
      </View>
    </View>
  );
};
