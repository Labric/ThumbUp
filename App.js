import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import AuthNav from "./src/navigation/AuthNav";
import TabNav from "./src/navigation/TabNav";

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) return null;
  if (!user) {
    return (
      <NavigationContainer>
        <AuthNav />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <TabNav />
    </NavigationContainer>
  );
}
