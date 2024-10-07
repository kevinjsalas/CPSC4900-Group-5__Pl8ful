import React from 'react';
import { Stack } from 'expo-router';
import NavigationBar from '@/components/NavigationBar';
import { StatusBar } from 'expo-status-bar';


const RootLayout = () => {
  return (
    <>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="favorites" />
      </Stack>
      <NavigationBar />
      <StatusBar />
    </>
  );
};

export default RootLayout;
