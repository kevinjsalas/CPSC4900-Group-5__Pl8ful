import React, { useState } from "react"; 
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, ImageBackground } from "react-native";
import loginStyles from "../styleSheets/loginStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";

const CreateUserScreen = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const createUser = async (username, email, password) => {
        setLoading(true);
        try {
            const response = await fetch('http://192.168.1.150:3000/createUser/create', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            });

            const responseText = await response.text();
            console.log('Response Status:', response.status);
            console.log('Response Text:', responseText);

            if (response.ok) {
                const responseData = JSON.parse(responseText);
                await AsyncStorage.setItem('username', username);
                console.log('User created:', responseData);
                router.replace('/profile')
            } else {
                console.log('User creation failed:', responseText);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground 
            source={require('../../assets/images/food_bg.png')}
            style={loginStyles.background}
        >
            <View style={loginStyles.loginContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#34404D" />
                ) : (
                    <>
                        <Text style={loginStyles.loginHeader}>Pl8FUL!</Text>
                        <TextInput 
                            placeholder="Username" 
                            placeholderTextColor="#8a8a8a" 
                            style={loginStyles.loginInput} 
                            onChangeText={text => setUsername(text)}
                            autoCapitalize="none"
                        />
                        <TextInput 
                            placeholder="Email" 
                            placeholderTextColor="#8a8a8a" 
                            style={loginStyles.loginInput}
                            onChangeText={text => setEmail(text)}
                            autoCapitalize="none"
                        />
                        <TextInput 
                            placeholder="Password" 
                            placeholderTextColor="#8a8a8a" 
                            style={loginStyles.loginInput}
                            onChangeText={text => setPassword(text)}
                            autoCapitalize="none"
                            secureTextEntry
                        />
                        <TouchableOpacity 
                            style={loginStyles.createButton} 
                            onPress={() => createUser(username, email, password)}
                        >
                            <Text style={loginStyles.buttonText}>Create Account</Text>
                        </TouchableOpacity> 
                    </>
                )}
            </View>
        </ImageBackground>
    );
};

export default CreateUserScreen;
