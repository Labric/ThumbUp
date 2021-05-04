import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { auth } from "../../config/FirebaseConfig";
import Swiper from "react-native-swiper";
import SeeProfile from "./SeeProfile";
import EditProfile from "./EditProfile";

export default function index() {
  const { currentUser } = auth;
  const users = useSelector((state) => state.userReducer);
  console.warn(users);
  const user = users.find((user) => user.id === currentUser.uid);
  console.warn(user);

  return (
    <Swiper
      loop={false}
      showsPagination={false}
    >

      <SeeProfile user={user}/>
      <EditProfile user={user}/>
    </Swiper>
  );
}

const styles = StyleSheet.create();
