import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './app/components/Main';
import firebase from "./app/utils/FirebaseConfig"
import StylesFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";


export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChange((user) => {
      setIsSignedIn(!!user)
    })
  }, [])
  return (
    <View style={styles.container}>
      {isSignedIn ? (
        <Main />
      ) : (
        <StylesFirebaseAuth 
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
