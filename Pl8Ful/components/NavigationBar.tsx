import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../app/styleSheets/styles';
import { useRouter } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';

const NavigationBar = () => {
    const router = useRouter();
    return (
        <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.bottomButton} onPress={() => router.navigate('./')}>
                <AntDesign name="home" size={24} color="#34404D" />
                <Text style={styles.bottomText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomButton} onPress={() => router.navigate('./favorites')}>
                <AntDesign name="hearto" size={24} color="#34404D" />
                <Text style={styles.bottomText}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomButton} onPress={() => router.navigate('./profile')}>
                <AntDesign name="user" size={24} color="#34404D" />
                <Text style={styles.bottomText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomButton} onPress={() => router.navigate('./login')}>
                <AntDesign name="lock" size={24} color="#34404D" />
                <Text style={styles.bottomText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default NavigationBar;