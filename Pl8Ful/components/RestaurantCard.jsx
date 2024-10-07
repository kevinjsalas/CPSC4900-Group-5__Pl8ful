import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../app/styles";
import { useState } from "react";
import { FlatList } from "react-native";


const fetchRestaurant = async () => {
    return [
        {id: 1, name: "McDonald's", location: "123 Fake St", hours: "24/7", rating: 4.5},
        {id: 2, name: "Burger King", location: "456 Real St", hours: "24/7", rating: 4.0},
        {id: 3, name: "Wendy's", location: "789 Imaginary St", hours: "24/7"}
    ];
};




const RestaurantCard = () => {
    const [restaurant, setRestaurant] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            const data = await fetchRestaurant();
            setRestaurant(data);
        };
        loadData();
    }, []);




    const renderRestaurant = ({ item }) => { 
        let rating = item.rating ? starRating(item.rating) : 'No reviews yet';
        return (
            <TouchableOpacity style={styles.linkButton} onPress={() => {}}>
                <View style={styles.linkText}>
                    <Text > {item.name} </Text>
                    <Text > {item.location} </Text>
                    <Text > {item.hours} </Text>
                    <Text styles={styles.rating}> {rating} </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <FlatList
                data={restaurant}
                renderItem={renderRestaurant}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const starRating = (rating) => {
    rating = Math.floor(rating);
    let star = '🌟';
    return star.repeat(rating);
};

export default RestaurantCard;