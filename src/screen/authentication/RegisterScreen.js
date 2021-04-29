import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  TouchableHighlight,
  Keyboard,
} from "react-native";
import auth from "@react-native-firebase/auth";
import * as yup from "yup";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserInput } from "../../components/CustomInput";
import { colors } from "../../config/utils";
import { firestore } from "../../config/FirebaseConfig";

export default function RegisterScreen({ navigation }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [errorEmail, setErrorEmail] = useState(false);
  const { currentUser } = auth;

  const isValidFirstname = (firstname) => {
    let schema = yup.string().required().min(3);
    return schema.isValidSync(firstname);
  };
  const isValidLastname = (lastname) => {
    let schema = yup.string().required();
    return schema.isValidSync(lastname);
  };
  const isValidEmail = (email) => {
    let schema = yup.string().email().required();
    return schema.isValidSync(email);
  };
  const isValidPassword = (password) => {
    let schema = yup
      .string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{8,}$/)
      .required();
    return schema.isValidSync(password);
  };

  const register = async () => {
    // const payload = {
    //   firstname: firstname.toLowerCase(),
    //   lastname: lastname.toLowerCase(),
    //   id: currentUser.uid,
    //   email: currentUser.email,
    //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    // };
    Keyboard.dismiss();
    isValidFirstname(firstname) &&
    isValidLastname(lastname) &&
    isValidEmail(email) &&
    isValidPassword(password) &&
    password === passwordConfirm
      && auth()
          .createUserWithEmailAndPassword(email, password)
          .then(await dispatchProfile(currentUser))
          .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
              setErrorEmail(true);
              return;
            }})
          
          
  };
  const dispatchProfile = (currentUser) => {
    if (!currentUser) return;
    return firestore.collection("Users").doc(currentUser.uid).set({
      firstname: firstname.toLowerCase(),
      lastname: lastname.toLowerCase(),
      id: currentUser.uid,
      email: currentUser.email,
      createdAt:  firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  return (
    <View>
      <UserInput
        label="Firstname"
        name="firstname"
        defaultValue={firstname}
        onChangeText={(text) => setFirstname(text)}
        //error={errorFirstname !== "" && errorFirstname}
        //onFocus={() => setErrorFirstname("")}
      />
      <UserInput
        label="Lastname"
        name="lastname"
        valuealue={lastname}
        onChangeText={(text) => setLastname(text)}
        // error={errorLastname !== "" && errorLastname}
        //onFocus={() => setErrorLastname("")}
      />

      <UserInput
        label="Email address"
        name="email"
        icon="mail"
        //onBlur={() => !isValidEmail(error)}
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        error={
          (email !== "" && !isValidEmail(email) && "Invalid email") ||
          (errorEmail && "Email already in use")
        }
      />

      <View>
        <UserInput
          label="Password"
          name="password"
          icon="lock-closed"
          secureTextEntry={secureTextEntry1}
          onChangeText={(text) => setPassword(text)}
          value={password}
          error={
            password !== "" &&
            !isValidPassword(password) &&
            "Password must contain at least 8 characters, one letter and one number."
          }
        />
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor="rgba(0, 0, 0, 0)"
          style={{ position: "absolute", right: 5, top: 42 }}
          onPress={() => setSecureTextEntry1(!secureTextEntry1)}
        >
          <Ionicons
            name={secureTextEntry1 === false ? "eye-off" : "eye"}
            color={colors.primary}
            size={25}
          />
        </TouchableHighlight>
      </View>

      <View>
        <UserInput
          label="Confirm password"
          name="passwordConfirm"
          icon="lock-closed"
          secureTextEntry={secureTextEntry2}
          onChangeText={(text) => setPasswordConfirm(text)}
          value={passwordConfirm}
          error={
            passwordConfirm !== "" &&
            password !== passwordConfirm &&
            "Passwords must match"
          }
        />
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor="rgba(0, 0, 0, 0)"
          style={{ position: "absolute", right: 5, top: 42 }}
          onPress={() => setSecureTextEntry2(!secureTextEntry2)}
        >
          <Ionicons
            name={secureTextEntry2 === false ? "eye-off" : "eye"}
            color={colors.primary}
            size={25}
          />
        </TouchableHighlight>
      </View>

      <Button onPress={() => register(navigation)} title="Register" />

      <Button
        title="Already an account ? Log in !"
        onPress={() => navigation.navigate("login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});
