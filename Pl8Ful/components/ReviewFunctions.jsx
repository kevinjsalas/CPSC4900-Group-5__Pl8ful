import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const RenderReviews = () => {
    
}

export const createReview = ( uid, rid, rating, review ) => {
    const handleCreateReview = async () => {
        try {
            const docRef = await setDoc(doc(db, 'reviews', rid), {
                    uid: uid,
                    rating: rating,
                    review: review
            });
            await setDoc(doc(db, 'users', uid, 'reviews'), {
                rid: docRef.id
            });
        } catch(error) {
            console.log('Error creating review: ', error.message);
        }
    }
    handleCreateReview();
}



const getRecentReviews = () => {

}