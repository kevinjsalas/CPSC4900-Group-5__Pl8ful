import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Touchable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router"
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import restaurantStyles from "../styleSheets/restaurantStyles";
import { getFavorites, removeFavorite, saveFavorite, checkFavorite} from "../simDB/favoriteRestaurants";
import { auth } from "../../firebaseConfig";
import { useState, useEffect } from "react";


const RestaurantScreen = () => {
    const { rid, name, location, hours, rating } = useLocalSearchParams();
    const restaurant = { rid, name, location, hours, rating };
    const router = useRouter();
    const user = auth.currentUser;

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            if (user) {
                const favoriteStatus = await checkFavorite(restaurant.rid, user.uid);
                setIsFavorite(favoriteStatus);
            }
        };
        fetchFavoriteStatus();
    }, [user, restaurant.rid]);

    const handleFavoritePress = async () => {
        if (user) {
            await saveFavorite(restaurant, user.uid);
            setIsFavorite((prev) => !prev);
        } else {
            console.log("User is not authenticated.");
        }
    };

    return (
        <View style={restaurantStyles.screenContainer}>
            <ImageBackground
            source={{ uri: 'https://marketplace.canva.com/EAFA7Zl1wfs/1/0/1600w/canva-pastel-red-green-illustrative-element-centric-video-background-Rs7EVOqIM2c.jpg' }}
            style={restaurantStyles.topBar}
            resizeMode="cover"
            />
            <View style={restaurantStyles.card}>
                <View style={restaurantStyles.informationCard}>
                    <View style={restaurantStyles.headerContainer}>
                        <Text style={restaurantStyles.header}>{name}</Text>
                        <TouchableOpacity onPress={handleFavoritePress}>
                            {
                                isFavorite
                                    ? <AntDesign name="heart" size={32} color="#EC8677" />
                                    : <AntDesign name="hearto" size={32} color="#EC8677" />
                            }
                        </TouchableOpacity>
                    </View>
                    <Text style={restaurantStyles.location}>{location}</Text>
                    <Text style={restaurantStyles.hours}>{hours}</Text>
                    <View style={restaurantStyles.rating}>{starRating(rating)}</View>
                    <TouchableOpacity onPress={() => 
                        router.push({
                            pathname: "/review", 
                            params: { 
                                rid: rid
                            } 
                        })}>
                        <Text style={restaurantStyles.leaveReviewButton}>Leave a review</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <View style={restaurantStyles.starBar}>
                        <Text style={restaurantStyles.starHead}>5</Text>
                        <FontAwesome name="star" size={18} color="#EC8677" />
                        <Text style={restaurantStyles.starHead}>:</Text>
                        <View style={restaurantStyles.bar}></View>
                        <Text style={restaurantStyles.barNum}>50</Text>
                    </View>
                    <View style={restaurantStyles.starBar}>
                        <Text style={restaurantStyles.starHead}>4</Text>
                        <FontAwesome name="star" size={18} color="#EC8677" />
                        <Text style={restaurantStyles.starHead}>:</Text>
                        <View style={restaurantStyles.bar}></View>
                        <Text style={restaurantStyles.barNum}>50</Text>
                    </View>
                    <View style={restaurantStyles.starBar}>
                        <Text style={restaurantStyles.starHead}>3</Text>
                        <FontAwesome name="star" size={18} color="#EC8677" />
                        <Text style={restaurantStyles.starHead}>:</Text>
                        <View style={restaurantStyles.bar}></View>
                        <Text style={restaurantStyles.barNum}>50</Text>
                    </View>
                    <View style={restaurantStyles.starBar}>
                        <Text style={restaurantStyles.starHead}>2</Text>
                        <FontAwesome name="star" size={18} color="#EC8677" />
                        <Text style={restaurantStyles.starHead}>:</Text>
                        <View style={restaurantStyles.bar}></View>
                        <Text style={restaurantStyles.barNum}>50</Text>
                    </View>
                    <View style={restaurantStyles.starBar}>
                        <Text style={restaurantStyles.starHead}>1</Text>
                        <FontAwesome name="star" size={18} color="#EC8677" />
                        <Text style={restaurantStyles.starHead}>:</Text>
                        <View style={restaurantStyles.bar}></View>
                        <Text style={restaurantStyles.barNum}>50</Text>
                    </View>
                </View>
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
                <ScrollView styles={restaurantStyles.reviewsContainer}>
                    <View style={restaurantStyles.reviewCard}>
                        <View style={restaurantStyles.nameStar}>
                            <Text style={restaurantStyles.name}>Jason</Text>
                            <View style={restaurantStyles.rating}>{reviewStarRating(rating)}</View>
                        </View>
                        <View style={restaurantStyles.divider}></View>
                        <View style={restaurantStyles.review}>
                            <Text style={restaurantStyles.reviewTitle}>Great food, great service!</Text>
                            <Text style={restaurantStyles.reviewText}>I had a great experience at this restaurant. The food was delicious and the service was excellent. I would definitely recommend this place to anyone looking for a good meal.</Text>
                        </View>
                    </View>
                    <View style={restaurantStyles.reviewCard}>
                        <View style={restaurantStyles.nameStar}>
                            <Text style={restaurantStyles.name}>Jason</Text>
                            <View style={restaurantStyles.rating}>{reviewStarRating(rating)}</View>
                        </View>
                        <View style={restaurantStyles.divider}></View>
                        <View style={restaurantStyles.review}>
                            <Text style={restaurantStyles.reviewTitle}>So Tasty!</Text>
                            <Text style={restaurantStyles.reviewText}>Short Review</Text>
                        </View>
                    </View>
                    <View style={restaurantStyles.reviewCard}>
                        <View style={restaurantStyles.nameStar}>
                            <Text style={restaurantStyles.name}>Jason</Text>
                            <View style={restaurantStyles.rating}>{reviewStarRating(rating)}</View>
                        </View>
                        <View style={restaurantStyles.divider}></View>
                        <View style={restaurantStyles.review}>
                            <Text style={restaurantStyles.reviewTitle}>WOW!</Text>
                            <Text style={restaurantStyles.reviewText}>Short review</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const starRating = (rating) => {
    const filledStars = Math.floor(rating);
    const totalStars = 5;
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
        stars.push(
            <FontAwesome
                key={i}
                name={i < filledStars ? "star" : "star-o"} 
                size={20}
                color="#EC8677"
            />
        );
    }
    return !rating ? <Text>No reviews yet</Text> : <View style={{ flexDirection: 'row' }}>{stars}</View>; // Return stars in a row
};

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
    return !rating ? <Text>No reviews yet</Text> : <View style={{ flexDirection: 'row' }}>{stars}</View>; // Return stars in a row
};

export default RestaurantScreen;