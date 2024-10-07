import React, { useState } from 'react';
import { Text, View, TextInput, ImageBackground } from 'react-native';
import styles from './styleSheets/styles';
import RestaurantCard from '@/components/RestaurantCard';

export default function HomePage() {
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
          placeholder="Search for restaurants..."
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
