import React from 'react'
import { 
    setDoc, getDoc,
    doc, collection,
    addDoc, getDocs,
    where, query,
    deleteDoc, orderBy,
    limit
    } from 'firebase/firestore';
import { db } from '../firebaseConfig';

async function getRestaurantData(rid) {
  try {
    const restaurantDocRef = doc(db, "restaurants", "chattanooga", "hamilton", rid);

    const restaurantDoc = await getDoc(restaurantDocRef);

    if (restaurantDoc.exists()) {
        console.log('Document found')
    } else {
      console.log("No such document exists!");
    }
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
  }
}

export const getAllRestaurants = async () => {
    try {
        const restaurantDocRef = collection(db, "restaurants", "chattanooga", "hamilton");
    
        const querySnapshot = await getDocs(restaurantDocRef);

        let allRestaurants = []
        querySnapshot.forEach((doc) => {
            allRestaurants = [...allRestaurants, doc.data()]
        });
        return allRestaurants

    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
}

// Getting all favorites for a given user
export const getFavoriteRestaurants = async (uid) => {
    const userDocRef = doc(db, 'users', uid)
    const favoritesCollectionRef = collection(userDocRef, 'favoriteRestaurants')
    try {
        let querySnapshot = await getDocs(favoritesCollectionRef)
        const restaurantIds = querySnapshot.docs.map(doc => doc.id)
        console.log("within database calls, favorites: ", restaurantIds)
        const restaurantData = await queryFavorites(restaurantIds)
        return restaurantData
    } catch (error) {
        console.log("Error fetching favorites: ", error)
    }
} 

// FAVORITE RESTAURANT FUNCTIONS
// making the query to find the favorite restaurants
const queryFavorites = async (rids) => {
    const restaurantRef = collection(db, 'restaurants', 'chattanooga', 'hamilton')
    const q = query(
        restaurantRef,
        where("rid", "in", rids)
    )

    try {
        const querySnapshot = await getDocs(q)
        const restaurantData = querySnapshot.docs.map(doc => doc.data())
        return restaurantData
    } catch(error) {
        console.log("Error getting favorites data: ", error)
    }
}
// setting favorite
export const setFavorite = async (uid, rid) => {
    const userFavoritesRef = collection(db, 'users', uid, 'favoriteRestaurants');
    const docRef = doc(userFavoritesRef, rid); 

    try {
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            console.log("Location 1: Document exists, deleting...");
            await deleteDoc(docRef); 
            console.log("Document has been deleted from favorites.");
        } else {
            console.log("Location 2: Document does not exist, adding...");
            await setDoc(docRef, { rid }); 
            console.log("Document has been added to favorites.");
        }
    } catch (error) {
        console.log("Error setting or deleting favorite: ", error);
    }
}

export const isFavorite = async (uid, rid) => {
    const userDocRef = doc(db, 'users', uid)
    const favoritesDocRef = doc(userDocRef, 'favoriteRestaurants', rid)

    try {
        const docSnapshot = await getDoc(favoritesDocRef);
        console.log("Is restaurant in user favorites: ", docSnapshot.exists())
        
        return docSnapshot.exists(); 
    } catch (error) {
        console.error("Error checking if favorite:", error);
        return false;
    }
}

// CREATE review
export const createReview = async (restaurantId, uid, title, review, rating) => {
    console.log("restaurandId: ", restaurantId)
    try {
        
      const reviewCollectionRef = await collection(db, 'reviews', 'restaurants', restaurantId);
  
      const newReview = {
        uid,
        title,
        review,
        date: new Date().toISOString(),
        rating,
      };
  
      await addDoc(reviewCollectionRef, newReview);
      console.log("Review created successfully!");
      return true;
    } catch (error) {
      console.error("CHANGE", error);
      return false;
    }
  }

// DELETE review
export const deleteReview = async (restaurantId, docId, userId) => {
    try {
      const reviewDocRef = doc(db, "reviews", 'restaurants', restaurantId, docId);
  
      // Fetch the review to validate user ID
      const reviewDoc = await getDoc(reviewDocRef);
  
      if (!reviewDoc.exists()) {
        console.error("Review not found!");
      }
  
      const reviewData = reviewDoc.data();
  
      // Validate the user ID matches the one stored in the review
      if (reviewData.uid !== userId) {
        console.error("User not authorized to delete this review!");
      }
  
      await deleteDoc(reviewDocRef);
      console.log("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review:", error);
    }
}

// FETCH reviews
export const getReviews = async (restaurantId, maxReviews = 3) => {
    try {
      const reviewCollectionRef = collection(db, "reviews", "restaurants", restaurantId);
      const reviewsQuery = query(reviewCollectionRef, orderBy("date", "desc"), limit(maxReviews));
      const querySnapshot = await getDocs(reviewsQuery);
  
      const reviews = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      console.log("Fetched reviews successfully!");
      return reviews;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }
}

// GET average rating for a restaurant
export const getAverageRating = () => {
    
}