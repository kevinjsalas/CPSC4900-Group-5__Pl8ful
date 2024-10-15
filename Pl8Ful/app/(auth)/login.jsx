import React, { useState, useEffect } from "react"; 
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, Button } from "react-native";
import loginStyles from "../styleSheets/loginStyles";
import { ImageBackground } from "react-native";
import signIn from "../../components/SignInComponent";


const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <ImageBackground 
            source={require('../../assets/images/food_bg.png')}
            style={loginStyles.background}
        >
            <View style={loginStyles.loginContainer}>
                <Text style={loginStyles.loginHeader}>Pl8FUL!</Text>
                <TextInput 
                    placeholder="Email" 
                    placeholderTextColor= "#8a8a8a" 
                    style={loginStyles.loginInput} 
                    onChangeText={text => setEmail(text)}
                    autoCapitalize="none"
                />
                <TextInput 
                    placeholder="Password" 
                    placeholderTextColor= "#8a8a8a" 
                    style={loginStyles.loginInput}
                    onChangeText={text => setPassword(text)}
                    autoCapitalize="none"
                    secureTextEntry
                />
                <TouchableOpacity style={loginStyles.loginButton} onPress={() => signIn(email, password)}>
                    <Text style={loginStyles.buttonText}>Login</Text>
                </TouchableOpacity> 
            </View>
        </ImageBackground>
    );
};

export default LoginScreen;