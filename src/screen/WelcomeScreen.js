import React from "react";
import { ImageBackground, Image, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/utils"



export default function WelcomeScreen({ navigation }) {
  return (
    // <ImageBackground
    //   style={styles.background}
    //   source={require("../assets/background.jpg")}
    // >
    <ImageBackground style={styles.background} source={require("../assets/background.jpg")}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Image style={styles.image} source={require("../assets/logo.jpg")} />
          <Text
            style={{ fontSize: 20, color: colors.primary, fontWeight: "bold", marginVertical: 10 }}
          >
            Voyagez à travers le monde
          </Text>
        </View>
        <View style={styles.button}>
          <AppButton
            text="login"
            color="green"
            onPress={() => console.warn("login")}
          />
          <AppButton
            text="register"
            color="blue"
            onPress={() => console.warn("register")}
          />
        </View>
      </View>
    </ImageBackground>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  top: {
    alignItems: "center",
    backgroundColor: colors.colors.yellow
  },
  button: {
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 75,
    height: 75,
    alignItems: "center",
  },
});
