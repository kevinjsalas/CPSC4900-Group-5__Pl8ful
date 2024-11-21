import React from 'react'
import { setDoc, getDoc, doc, collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

async function getRestaurantData(rid) {
  try {
    const restaurantDocRef = doc(db, "restaurants", "chattanooga", "hamilton", rid);

    const restaurantDoc = await getDoc(restaurantDocRef);

    if (restaurantDoc.exists()) {
      console.log("Restaurant Data:", restaurantDoc.data());
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

  getAllRestaurants()
