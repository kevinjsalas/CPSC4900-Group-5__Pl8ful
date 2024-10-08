import React from 'react';
import { Stack } from 'expo-router';
import NavigationBar from '@/components/NavigationBar';
import { StatusBar } from 'expo-status-bar';


const RootLayout = () => {
  return (
    <>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{presentation: 'modal'}}/>
      </Stack>
      {/* <NavigationBar /> */}
      <StatusBar />
    </>
  );
};

export default RootLayout;
