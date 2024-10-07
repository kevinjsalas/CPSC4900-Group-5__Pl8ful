import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../app/styles';
import { useRouter } from 'expo-router'

const NavigationBar = () => {
    const router = useRouter();
    return (
        <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.bottomButton} onPress={() => router.navigate('./')}>
                <FontAwesome name="home" size={24} color="black" />
                <Text style={styles.bottomText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomButton} onPress={() => router.navigate('./favorites')}>
                <FontAwesome name="heart" size={24} color="black" />
                <Text style={styles.bottomText}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomButton} onPress={() => router.navigate('./profile')}>
                <FontAwesome name="user" size={24} color="black" />
                <Text style={styles.bottomText}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

export default NavigationBar;