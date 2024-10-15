import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import profileStyles from "../app/styleSheets/profileStyles";
import { auth } from "../firebaseConfig";
import { signOut } from "./UserFunctions";


const renderProfile = () => {
    const user = auth.currentUser;
    return (
        <View style={profileStyles.container2}>
            <ImageBackground
                source={{ uri: 'https://marketplace.canva.com/EAFA7Zl1wfs/1/0/1600w/canva-pastel-red-green-illustrative-element-centric-video-background-Rs7EVOqIM2c.jpg' }}
                style={profileStyles.topBar}
                resizeMode="cover"
            />
            <View style={profileStyles.headerContainer}>
                <TouchableOpacity style={""} onPress={{}}>
                    <View style={profileStyles.userPhoto}>
                        <Image source={user.photoURL}></Image>
                    </View>
                </TouchableOpacity>
                <Text style={profileStyles.header}> {user.uid} </Text>
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
                <TouchableOpacity style={profileStyles.signOut} onPress={signOut}>
                    <Text style={profileStyles.buttonText}>Sign Out</Text>
                </TouchableOpacity> 
            </View>
        </View>
    )
};

export default renderProfile;