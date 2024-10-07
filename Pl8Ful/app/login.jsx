import React from "react"; 
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { TextInput } from "react-native";
import { useFonts } from 'expo-font'; // Import useFonts
import loginStyles from "../app/styleSheets/loginStyles";

const LoginScreen = () => {
    // // Load the font using useFonts
    // const [fontsLoaded] = useFonts({
    //     'ReemKufiFun-VariableFont_wght': require('../assets/fonts/ReemKufiFun-VariableFont_wght.ttf'),
    // });

    // // Display a loading indicator if the fonts are not loaded
    // if (!fontsLoaded) {
    //     return <ActivityIndicator size="large" color="#0000ff" />;
    // }

    return (
        <View style={loginStyles.loginContainer}>
            <Text style={loginStyles.loginHeader}>Pl8FUL!</Text>
            <TextInput placeholder="Username" placeholderTextColor= "#8a8a8a" style={loginStyles.loginInput}/>
            <TextInput placeholder="Password" placeholderTextColor= "#8a8a8a" style={loginStyles.loginInput}/>
            <TouchableOpacity style={loginStyles.loginButton} onPress={() => {}}>
                <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity> 
        </View>
    );
};

export default LoginScreen;