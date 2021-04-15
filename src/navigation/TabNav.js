import React from "react";
import SearchTravel from "../screen/SearchTravel";
import UpdateTravel from "../screen/UpdateTravel";
import AddTravel from "../screen/AddTravel";
import Messaging from "../screen/messaging/index";
import Profile from "../screen/profile/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../config/utils/";

const Tab = createBottomTabNavigator();

const AuthNavigation = () => (
  <Tab.Navigator
    initialRouteName="search"
    tabBarOptions={{
      activeBackgroundColor: colors.greenLight,
      inactiveBackgroundColor: colors.green,
      keyboardHidesTabBar: true,
      showLabel: false,
      labelStyle: {
        fontSize: 15,
      },
    }}
  >
    <Tab.Screen
      name="update"
      component={UpdateTravel}
      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="list"
            size={24}
            color={colors.white}
          />
        ),
        justifyContent: "center",
        alignItems: "center",
      }}
    />
    <Tab.Screen
      name="add"
      component={AddTravel}
      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="add-circle"
            size={24}
            color={colors.white}
          />
        ),
        activeTintColor: colors.white,
      }}
    />
    <Tab.Screen
      name="search"
      component={SearchTravel}
      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="search"
            size={24}
            color={colors.offWhite}
          />
        ),
      }}
    />
    <Tab.Screen
      name="messaging"
      component={Messaging}
      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="ios-chatbubbles"
            size={24}
            color={colors.white}
          />
        ),
      }}
    />
    <Tab.Screen
      name="profile"
      component={Profile}
      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="person"
            size={24}
            color={colors.white}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AuthNavigation;
