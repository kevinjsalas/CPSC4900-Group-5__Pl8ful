import React, { useState } from "react"; 
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, ImageBackground } from "react-native";
import loginStyles from "../styleSheets/loginStyles";

const CreateUserScreen = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const createUser = async (username, email, password) => {
        setLoading(true); // Start loading
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

            const responseText = await response.text(); // Get response as text
            console.log('Response Status:', response.status); // Log the response status
            console.log('Response Text:', responseText); // Log the response text

            if (response.ok) {
                const responseData = JSON.parse(responseText); // Parse response if OK
                console.log('User created:', responseData);
            } else {
                console.log('User creation failed:', responseText); // Log the error response
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false); // Stop loading
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
