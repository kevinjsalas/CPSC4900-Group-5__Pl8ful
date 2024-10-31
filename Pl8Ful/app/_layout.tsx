import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { monitorAuthState } from '../components/UserFunctions'
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';



const RootLayout = () => {
  const [user, setUser] = useState<any>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        monitorAuthState();
        return () => unsubscribe();
    }, []);
  return (
    <>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{presentation: 'modal'}}/>
        <Stack.Screen name="(auth)/create" options={{presentation: 'modal'}}/>
        <Stack.Screen name="(restaurants)/restaurant" />
        <Stack.Screen name="(reviews)/review" options={{presentation: 'modal'}}/>
      </Stack>
      <StatusBar />
    </>
  );
};

export default RootLayout;
