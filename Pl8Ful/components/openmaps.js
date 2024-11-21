import React from 'react';
import { View, Button, Linking, StyleSheet, Alert } from 'react-native';

// Function to open Apple Maps with an address
export const openAppleMaps = (address) => {
    // Constructing the URL for Apple Maps using the dynamic address
    const url = `http://maps.apple.com/?q=${encodeURIComponent(address)}`;

    // Using Linking.openURL to open the URL. If there's an error, show an alert
    Linking.openURL(url).catch(() => {
        // Display an alert if unable to open the maps URL
        Alert.alert('Error', 'Unable to open maps');
    });
};

