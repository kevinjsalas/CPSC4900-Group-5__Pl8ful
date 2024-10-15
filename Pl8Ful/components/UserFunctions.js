import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
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

export const checkLoggedIn = () => {
    const checkLoggedIn = async () => {
        const uid = auth.currentUser;
        if (user) {
            console.log('User is signed in');
        } else {
            console.log('User is not signed in');
        }
    }
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
  
