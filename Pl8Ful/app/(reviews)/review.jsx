import React, { useState, useEffect } from "react"; 
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, Button } from "react-native";
import reviewStyles from "../styleSheets/reviewStyles";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";


const ReviewScreen = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);
    const router = useRouter();
    const rid = useLocalSearchParams();

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                    <FontAwesome
                        name={i <= rating ? "star" : "star-o"}
                        size={24}
                        color="#EC8677"
                    />
                </TouchableOpacity>
            );
        }
        return stars;
    };

    return (
        <View style={reviewStyles.container}>
            <View style={reviewStyles.reviewContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={reviewStyles.reviewHeader}>Review</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        {renderStars()}
                    </View>
                </View>
                <TextInput
                    style={reviewStyles.title}
                    onChangeText={text => setTitle(text)}
                    placeholder="Title"
                    placeholderTextColor={"#b0b0b0"}
                    maxLength={50}
                />
                <TextInput
                    style={reviewStyles.text}
                    onChangeText={text => setText(text)}
                    placeholder="Leave review here..."
                    placeholderTextColor={"#b0b0b0"}
                    multiline={true}
                    maxLength={500}
                />
                <TouchableOpacity style={reviewStyles.submitButton} title="Submit" onPress={() => {}}>
                    <Text style={{ color: "#FFFFFF", textAlign: "center", fontSize: 18, fontWeight: 700 }}>Submit</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
};

export default ReviewScreen;