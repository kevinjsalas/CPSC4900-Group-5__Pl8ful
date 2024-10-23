import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground, ActivityIndicator } from "react-native";
import profileStyles from "../app/styleSheets/profileStyles";
import { auth } from "../firebaseConfig";
import { signOut, getUserInfo } from "./UserFunctions";

const RenderProfile = () => {
    
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const user = auth.currentUser;

    useEffect(() => {
        const fetchUserData = async () => {
            
            if (user) {
                const data = await getUserInfo(user.uid);
                setUserData(data);
                setLoading(false);
            }
            setLoading(false);
        };
        fetchUserData();
    },[]);

    if (loading) {
        return (
            <View style={profileStyles.container2}>
            <ActivityIndicator size="large" color="#34404D" />
            </View>
        );
    };


    return (
        <View style={profileStyles.container2}>
            <ImageBackground
                source={{ uri: 'https://marketplace.canva.com/EAFA7Zl1wfs/1/0/1600w/canva-pastel-red-green-illustrative-element-centric-video-background-Rs7EVOqIM2c.jpg' }}
                style={profileStyles.topBar}
                resizeMode="cover"
            />
            <View style={profileStyles.headerContainer}>
                <TouchableOpacity style={""} onPress={() => {}}>
                    <View style={profileStyles.userPhoto}>
                        <Image source={user.photoURL}></Image>
                    </View>
                </TouchableOpacity>
                <Text style={profileStyles.header}>{userData.firstName}</Text>
            </View>
            <View style={profileStyles.divider}></View>
            <View style={profileStyles.profileContent}>
                <TouchableOpacity style={{}}>
                    <Text style={{}}></Text>
                </TouchableOpacity>
                <View style={profileStyles.divider}></View>
                <TouchableOpacity style={{}}>
                    <Text style={{}}></Text>
                </TouchableOpacity>
                <View style={profileStyles.buttonContainer}>
                    <TouchableOpacity style={profileStyles.signOut} onPress={signOut}>
                        <Text style={profileStyles.buttonText}>Sign Out</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        </View>
    )
};

export default RenderProfile;