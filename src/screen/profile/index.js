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
        {/* <View style={styles.slide1}></View>
        <View style={styles.slide2}></View> */}
      <SeeProfile user={user}/>
      <EditProfile user={user}/>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
