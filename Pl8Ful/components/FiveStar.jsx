import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

const FiveStar = () => {
    const [rating, setRating] = useState(0);

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
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {renderStars()}
        </View>
    );
};

export default FiveStar;