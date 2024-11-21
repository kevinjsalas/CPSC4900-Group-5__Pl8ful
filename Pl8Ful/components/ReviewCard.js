import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome, Entypo } from '@expo/vector-icons';
import restaurantStyles from "../app/styleSheets/restaurantStyles";
import { getReviews } from './DatabaseCalls'


const ReviewCard = ({ restaurantId }) => {
    const [reviews, setReviews] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            // add in a way to give getReviews a parameter for how 
            // to return the data (recent, highest rating, etc)
            const data = await getReviews(restaurantId);
            setReviews(data);
        };
        loadData();
        
    }, []);

    const renderReview = ({ item }) => {
        console.log("Reviews length: ", reviews.length)
        return (
            reviews.length == 0 ? (
                <View style={restaurantStyles.reviewsContainer}>
                    <Text style={restaurantStyles.name}>No Reviews Yet</Text>
                </View>
        ) : (
            <View>
                <TouchableOpacity 
                    style={restaurantStyles.reviewCard} 
                    onPress={() => 
                        router.push({
                            // pathname: "/restaurant", 
                            // params: {
                            //     rid: item.rid,
                            //     name: item.name ?? '',
                            //     address: item.address ?? '',
                            //     hours: item.hours ?? '',
                            //     rating: item.rating ?? null,
                            // } 
                        })
                    }>
                    <View style={restaurantStyles.nameStar}>
                        <Text style={restaurantStyles.name}>Get Name</Text>
                        <View style={restaurantStyles.rating}>{reviewStarRating(item.rating)}</View>
                    </View>
                    <View style={restaurantStyles.divider}></View>
                    <View style={restaurantStyles.review}>
                        <Text style={restaurantStyles.reviewTitle}>{item.title}</Text>
                        <Text style={restaurantStyles.reviewText}>{item.review}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        
        ));
    };

    return (
        <View>
            <View style={restaurantStyles.filterBar}>
                <Text style={restaurantStyles.filterHeader1}>Reviews</Text>
                <View style={restaurantStyles.filterButton}>
                    <Text style={restaurantStyles.filterHeader2}>Sort by:  </Text>
                    <TouchableOpacity style={restaurantStyles.filterButton} onPress={() => {}}>
                        <Text style={restaurantStyles.filterHeader2}>Rating</Text>
                        <Entypo name="chevron-down" size={24} color="#EC8677" />
                    </TouchableOpacity>
                </View>
            </View>
            {reviews.length == 0 ? 
                <View style={restaurantStyles.reviewsContainer}>
                    <Text style={restaurantStyles.name}>No Reviews Yet</Text>
                </View>
                :
                <FlatList
                    data={reviews}
                    renderItem={renderReview}
                    keyExtractor={(item) => item.id != null ? item.id.toString() : ''}
                />
            }
        </View>
    );
};

export default ReviewCard;

const reviewStarRating = (rating) => {
    const filledStars = Math.floor(rating);
    const totalStars = 5;
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
        stars.push(
            <FontAwesome
                key={i}
                name={i < filledStars ? "star" : "star-o"} 
                size={12}
                color="#EC8677"
            />
        );
    }
    return !rating ? <Text>No rating</Text> : <View style={{ flexDirection: 'row' }}>{stars}</View>; // Return stars in a row
};