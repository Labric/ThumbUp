import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoogleMaps from './src/components/GoogleMaps';
import RegisterScreen from './src/screen/authentication/RegisterScreen';
import CompleteProfile from './src/screen/authentication/CompleteProfile';
import WelcomeScreen from './src/screen/WelcomeScreen';




export default function App() {
  return (
    //<RegisterScreen />
    <CompleteProfile />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
