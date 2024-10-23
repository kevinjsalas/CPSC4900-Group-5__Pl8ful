import React, { useState } from "react"; 
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, ImageBackground } from "react-native";
import loginStyles from "../styleSheets/loginStyles";
import { useRouter } from "expo-router";
import { createUser } from "../../components/UserFunctions";

const CreateUserScreen = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const createNew = async (firstName, lastName, email, password) => {
        setLoading(true);
        try {
          await createUser(firstName, lastName, email, password);
          router.replace('/profile');
        } catch (error) {
            console.log('Error creating user: ', error.message);
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
                            placeholder="First Name" 
                            placeholderTextColor="#8a8a8a" 
                            style={loginStyles.loginInput} 
                            onChangeText={text => setFirstName(text)}
                            autoCapitalize="none"
                        />
                        <TextInput 
                            placeholder="Last Name" 
                            placeholderTextColor="#8a8a8a" 
                            style={loginStyles.loginInput} 
                            onChangeText={text => setLastName(text)}
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
                            onPress={() => createNew(firstName, lastName, email, password)}
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
