import React, { useState } from 'react';
import { Text, View, TextInput, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import NavigationBar from '@/components/NavigationBar';
import RestaurantCard from '@/components/RestaurantCard';

export default function HomePage() {
  // Sample state for the rating, you can dynamically set these values later

  return (
    <View style={styles.container}>
      {/* Top bar for the homepage */}
      <ImageBackground
        source={{ uri: 'https://marketplace.canva.com/EAFA7Zl1wfs/1/0/1600w/canva-pastel-red-green-illustrative-element-centric-video-background-Rs7EVOqIM2c.jpg' }}
        style={styles.topBar}
        resizeMode="cover"
      >
        <Text style={styles.topBarText}>Pl8Ful</Text>
      </ImageBackground>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for restaurants..."
          placeholderTextColor="#888"
        />
      </View>

      {/* Restaurant sections with 5-star rating */}
      <View style={styles.linksContainer}>
        <RestaurantCard /> 
      </View>
      
    </View>
  );
};
