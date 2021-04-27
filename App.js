import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { firestore, auth, firebase } from "./src/config/FirebaseConfig";
import { NavigationContainer } from "@react-navigation/native";
import AuthNav from "./src/navigation/AuthNav";
import TabNav from "./src/navigation/TabNav";
import LoginScreen from "./src/screen/authentication/LoginScreen";
import WelcomeScreen from "./src/screen/WelcomeScreen";
import { Provider } from "react-redux";
import { getUsers } from "./src/reduxFolder/Actions/userAction";
import { store } from "./src/reduxFolder/index";
import { useSelector } from "react-redux";
import { getTravels } from "./src/reduxFolder/Actions/travelAction";


export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const { currentUser } = auth;

  // console.warn(user.uid)
  // console.warn(user.emailVerified)
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  store.dispatch(getUsers());
  store.dispatch(getTravels());
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) return null;
  if (!user) {
    return (
      <NavigationContainer>
        <AuthNav />
      </NavigationContainer>
    );
  } else {
    console.log("current user :", currentUser.uid);
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNav />
      </NavigationContainer>
    </Provider>

  );
}
// }
