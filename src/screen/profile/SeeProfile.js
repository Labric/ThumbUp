import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment"
import { Rating, AirbnbRating } from 'react-native-ratings';


export default function SeeProfile({user}) {
    console.warn(user.profilePicture)
    const dateString = moment(user.createdAt).format("MMMM Do YYYY").toString()

ratingCompleted(rating) {
  console.log("Rating is: " + rating)
}
    return (
        <View style={{alignItems: "center"}}>
            <View style={{ width: 200, height: 200, borderRadius: 100, alignItems: "center",
            justifyContent: "center", backgroundColor: "pink",}}>
            {!user.profilePicture ? (
            <Ionicons name="camera-outline" size={30} color="black" />
          ) : (
            <Image
              source={{ uri: user.profilePicture }}
              resizeMode="cover"
              style={{ width: 200, height: 200, borderRadius: 100 }}
            />
          )}
          </View>
          <Text>{user.firstname} {user.lastname}</Text>

          <View style={{backgroundColor: "grey", width: "100%", height: 1}} />

          <Text>Member since : {dateString}</Text>

          <AirbnbRating />

<AirbnbRating
  count={11}
  reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
  defaultRating={11}
  size={20}
/>

<Rating
  showRating
  onFinishRating={this.ratingCompleted}
  style={{ paddingVertical: 10 }}
/>

<Rating
  type='heart'
  ratingCount={3}
  imageSize={60}
  showRating
  onFinishRating={this.ratingCompleted}
/>

<Rating
  type='custom'
  ratingColor='#3498db'
  ratingBackgroundColor='#c8c7c8'
  ratingCount={10}
  imageSize={30}
  onFinishRating={this.ratingCompleted}
  style={{ paddingVertical: 10 }}
/>
        </View>
    )
}

const styles = StyleSheet.create({})
