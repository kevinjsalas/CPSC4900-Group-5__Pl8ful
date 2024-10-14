import { View, Text, TouchableOpacity } from "react-native";
import profileStyles from "../app/styleSheets/profileStyles";


const renderProfile = (user) => {
    return (
        <View style={profileStyles.container}>
            <TouchableOpacity style={""} onPress={{}}>
                <View style={profileStyles.userPhoto}></View>
            </TouchableOpacity>
            <Text style={profileStyles.header}> Header </Text>

            <View style={profileStyles.divider}></View>
            <View style={profileStyles.profileContent}>
                <TouchableOpacity style={{}}>
                    <Text style={{}}></Text>
                </TouchableOpacity>
                <View style={profileStyles.divider}></View>
                <TouchableOpacity style={{}}>
                    <Text style={{}}></Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default renderProfile;