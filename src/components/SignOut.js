import React from "react";
import { Button, StyleSheet, Text, View, TouchableHighlight } from "react-native";
import auth from "@react-native-firebase/auth";
export default function SignOut({navigation}) {
  const deco = (navigation) => {
    auth()
      .signOut()
      .then(() => navigation.navigate("welcome"));
  };
  return (
    <TouchableHighlight>
      <Button title="Deco" onPress={() => deco(navigation)} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({});
