import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importing icons for the stars

export default function HomePage() {
  // Sample state for the rating, you can dynamically set these values later
  const [rating, setRating] = useState([4.5, 4.4, 4.3, 4.0, 3.8, 3.6]);

  return (
    <View style={styles.container}>
      {/* Top bar with image background and app name */}
      <ImageBackground
        source={{ uri: 'https://marketplace.canva.com/EAFA7Zl1wfs/1/0/1600w/canva-pastel-red-green-illustrative-element-centric-video-background-Rs7EVOqIM2c.jpg' }}
        style={styles.topBar}
        resizeMode="cover"
      >
        <Text style={styles.topBarText}>Pl8ful</Text>
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
      <ScrollView style={styles.linksContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Rated</Text>
          {renderRestaurant('Restaurant 1', rating[0])}
          {renderRestaurant('Restaurant 2', rating[1])}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Restaurants</Text>
          {renderRestaurant('Restaurant 3', rating[2])}
          {renderRestaurant('Restaurant 4', rating[3])}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget Friendly</Text>
          {renderRestaurant('Restaurant 5', rating[4])}
          {renderRestaurant('Restaurant 6', rating[5])}
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomButton}>
          <FontAwesome name="map-marker" size={24} color="black" />
          <Text style={styles.bottomText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <FontAwesome name="user" size={24} color="black" />
          <Text style={styles.bottomText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <FontAwesome name="heart" size={24} color="black" />
          <Text style={styles.bottomText}>Favorites</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Helper function to render restaurants with star rating
const renderRestaurant = (name: string, rating: number) => {
  return (
    <TouchableOpacity style={styles.linkButton}>
      <Text style={styles.linkText}>{name} - {rating.toFixed(1)} ⭐</Text>
      <View style={styles.rating}>
        {[...Array(5)].map((_, i) => {
          const starType = rating >= i + 1 ? 'star' : rating >= i + 0.5 ? 'star-half' : 'star-o';
          return <FontAwesome key={i} name={starType} size={20} color="#FFD700" />;
        })}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topBar: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarText: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 10,
  },
  searchBar: {
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  linksContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  linkButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  linkText: {
    fontSize: 18,
    color: '#333',
  },
  rating: {
    flexDirection: 'row',
    marginTop: 5,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  bottomButton: {
    alignItems: 'center',
  },
  bottomText: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
});
