import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { Rating, AirbnbRating } from "react-native-ratings";
import { colors, layout } from "../../config/utils";
import DeleteUser from "./DeleteUser";
import SignOut from "../../components/SignOut";
import Preferences from "../../components/Preferences";

export default function SeeProfile({ user }) {
  const dateString = moment(user.createdAt).format("MMMM Do YYYY").toString();

  function ratingCompleted(rating) {
    console.log("Rating is: " + rating);
  }
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          width: 200,
          height: 200,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "pink",
        }}
      >
        {user.profilePictureURL ? (
          <Image
            source={{ uri: user.profilePictureURL }}
            resizeMode="cover"
            style={{ width: 200, height: 200, borderRadius: 100 }}
          />
        ) : (
          <Ionicons name="camera-outline" size={30} color="black" />
        )}
      </View>
      <Text>
        {user.firstname} {user.lastname}
      </Text>

      <View style={{ backgroundColor: "grey", width: "100%", height: 1 }} />

      <Text>Member since : {dateString}</Text>

      <View>
        <Rating
          startingValue={3.5}
          type="star"
          showRating={true}
          tintColor="#F4F4F4"
          readonly={true}
          showReadOnlyText={false}
          ratingTextColor="black"
          ratingCount={5}
          imageSize={20}
          fractions={1}
          onFinishRating={ratingCompleted}
          style={{ paddingVertical: 10, backgroundColor: "transparent" }}
        />
      </View>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <View
          style={{
            marginHorizontal: 10,
            paddingHorizontal: 15,
            width: layout.width * 0.4,
            backgroundColor: colors.secondary,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Preferences />
        </View>
        <View
          style={{
            marginHorizontal: 10,
            width: layout.width * 0.4,
            backgroundColor: colors.secondary,
            borderRadius: 20,
            alignItems: "center",
            padding: 10,
          }}
        >
          {user.carPictureURL ? (
            <Image
              source={{ uri: user.carPictureURL }}
              resizeMode="cover"
              style={{ width: 40, height: 40, borderRadius: 25 }}
            />
          ) : (
            <Ionicons name="car" size={30} color="black" />
          )}
          <Text>{user.carBrand}</Text>
          <Text>{user.carModel}</Text>
        </View>
      </View>
      <View
        style={{
          borderRadius: 20,
          backgroundColor: colors.secondary,
          marginTop: 20,
          marginHorizontal: 10,
          padding: 5,
        }}
      >
        <Text style={{ color: "black" }}>{user.description}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <Text style={{ color: colors.green }}>Swipe to edit</Text>
        <Ionicons name="arrow-forward" size={20} color={colors.green} />
      </View>
      <SignOut />
      <DeleteUser />
    </View>
  );
}

const styles = StyleSheet.create({});
