import React, { useState } from "react";
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { UserInput } from "../../components/CustomInput";
import auth from "@react-native-firebase/auth";
import * as yup from "yup";
import Ionicons from "react-native-vector-icons/Ionicons";
import utils, { colors } from "../../config/utils";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [errorEmail, setErrorEmail] = useState();
  const [errorPassword, setErrorPassword] = useState();

  const isValidEmail = (email) => {
    let schema = yup.string().email().required();
    return schema.isValidSync(email);
  };

  const login = (navigation) => {
    Keyboard.dismiss();
    if (!isValidEmail(email)) {
      setErrorEmail("Invalid Email.");
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            setErrorEmail("Unknown email-address.");
          } else if (error.code === "auth/wrong-password") {
            setErrorPassword("Wrong password.");
          }
        })
        .then(() => navigation.navigate("search"));
    }
  };

  return (
    <View>
      <UserInput
        name="email"
        label="Email"
        keyboardType="email-address"
        icon="mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
        error={errorEmail !== "" && errorEmail}
        onFocus={() => setErrorEmail("")}
      />
      <View>
        <UserInput
          name="password"
          label="Password"
          icon="lock-closed"
          value={password}
          secureTextEntry={secureTextEntry}
          onChangeText={(text) => setPassword(text)}
          error={errorPassword !== "" && errorPassword}
          onFocus={() => setErrorPassword("")}
        />
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor="rgba(0, 0, 0, 0)"
          style={{ position: "absolute", right: 5, top: 42 }}
          onPress={() => setSecureTextEntry(!secureTextEntry)}
        >
          <Ionicons
            name={secureTextEntry === false ? "eye-off" : "eye"}
            color={colors.primary}
            size={25}
          />
        </TouchableHighlight>
      </View>
      <Button title="Log in" onPress={() => login()} />
    </View>
  );
}

const styles = StyleSheet.create({});
