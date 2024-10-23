import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { router } from 'expo-router';

export const signOut = () => {
    const handleSignOut = async () => {
        try {
            await auth.signOut();
            console.log('User signed out');
            
        } catch(error) {
            console.log('Error signing out: ', error.message);
        } finally {
            router.replace('/profile');
        }
    }
    handleSignOut();
};

export const createUser = (firstName, lastName, email, password) => {
    console.log('Creating user...');
    let date = new Date().toLocaleDateString();
    const handleSignUp = async () => {
        const router = useRouter();
        try {
            console.log('Signing up...');
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User signed up: ', userCredential.user);
            const uid = userCredential.user.uid;
            console.log('User ID: ', uid);
            await setDoc(doc(db, 'users', uid), {
                firstName: firstName,
                lastName: lastName,
                email: email,
                date: date
            });
        } catch (error) {
            console.log('Error signing up: ', error.message);
        }
        router.replace('/profile');
    }
    handleSignUp();
};


export const monitorAuthState = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User is signed in:", user.uid);
        } else {
          console.log("No user is signed in.");
        }
    });
};

export const isUserLoggedIn = () => {
    return auth.currentUser !== null;
};

export const getUserInfo = async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('User data found: ', userData);
        return userData;
      } else {
        console.log('No user data found');
        return null;
      }
    } catch (error) {
      console.log('Error getting user data: ', error.message);
      return null;
    }
  };