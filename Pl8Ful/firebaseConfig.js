import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyA7NktjwzA71xt7T4MMY-aE3mOQwvU4d74",
    authDomain: "pl8ful-ead31.firebaseapp.com",
    projectId: "pl8ful-ead31",
    storageBucket: "pl8ful-ead31.appspot.com",
    messagingSenderId: "603721789941",
    appId: "1:603721789941:web:da50c2f04aef14a25730bc"
};

const app = initializeApp(firebaseConfig)


const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { auth, db };
