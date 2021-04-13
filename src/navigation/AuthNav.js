import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screen/WelcomeScreen";
import LoginScreen from "../screen/authentication/LoginScreen";
import RegisterScreen from "../screen/authentication/RegisterScreen";
import CompleteProfile from "../screen/authentication/CompleteProfile";

const Stack = createStackNavigator();

const AuthNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="welcome"
      component={WelcomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="login" component={LoginScreen} />
    <Stack.Screen name="register" component={RegisterScreen} />
    <Stack.Screen name="completeProfil" component={CompleteProfile} />
  </Stack.Navigator>
);

export default AuthNavigation;
