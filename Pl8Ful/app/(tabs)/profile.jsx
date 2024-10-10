import React from "react";
import { View, Text, Button, TouchableOpacity, TouchableHighlightComponent } from "react-native";
import { router } from "expo-router";
import profileStyles from "../styleSheets/profileStyles";


const ProfileScreen = () => {
    return (
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
    );
};

export default ProfileScreen;