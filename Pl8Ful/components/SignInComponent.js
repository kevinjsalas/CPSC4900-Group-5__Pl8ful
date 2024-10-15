import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { router } from 'expo-router';

const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in: ', userCredential.user);
    } catch (error) {
        console.error('Error signing in: ', error.message);
    } finally {
        router.replace('/profile');
    }
};

export default signIn;