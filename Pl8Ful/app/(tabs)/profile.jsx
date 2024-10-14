import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import profileStyles from "../styleSheets/profileStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfile from "../../components/UserProfile";

const ProfileScreen = () => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const storedUsername = await AsyncStorage.getItem('username');
            if (storedUsername) {
                setUsername(storedUsername);
            }
        };

        checkLoggedIn();
    }, []);

    const handleSignOut = async () => {
        await AsyncStorage.removeItem('username');
        setUsername(null);
    };

    return (
        <>
            {username ? (
                <UserProfile />
            ) : (
                <View style={profileStyles.container}>
                    <View styles={profileStyles.headerContainer}>
                        <Text style={profileStyles.header}>  </Text>
                    </View>
                    <TouchableOpacity style={profileStyles.button} onPress={() => router.push("/login")}>
                        <Text style={profileStyles.buttonText}>Sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={profileStyles.button} onPress={() => router.push("/create")}>
                        <Text style={profileStyles.buttonText}>Create New Account</Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
};

export default ProfileScreen;
