import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  Alert,
  TouchableHighlight,
  Keyboard,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore, { firebase } from "@react-native-firebase/firestore";
import AppButton from "../components/AppButton";
import * as yup from "yup";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomInput from "../components/CustomInput";

export default function LoginScreen() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);

  const register = () => {
    Keyboard.dismiss();
    firebase
      .firestore()
      .collection("Users")
      .add({
        email,
        password,
        firstname,
        lastname,
        age,
        phone,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        alert("success !!");
      });
  };

  const isValidForm = () => {
    let schema = yup.object().shape({
      firstname: yup.string().required(),
      lastname: yup.string().required(),
      age: yup.number().required().positive().integer().min(18),
      phone: yup.number().required().min(10).max(10),
      email: yup.string().email(),
      password: yup.string().required(),
      passwordConfirm: yup.string(),
    });
    let result = schema.isValid();
    return result;
  };

  return (
    <View>
      <CustomInput
        label="Firstname"
        name="firstname"
        onChangeText={(text) => setFirstname(text)}
        value={firstname}
      />
      <CustomInput
        label="Lastname"
        name="lastname"
        onChangeText={(text) => setLastname(text)}
        value={lastname}
      />
      <CustomInput
        label="Age"
        keyboardType="numeric"
        name="age"
        onChangeText={(text) => setAge(text)}
        value={age}
      />
      <CustomInput
        label="Phone number"
        keyboardType="numeric"

        name="phone"
        onChangeText={(text) => setPhone(text)}
        value={phone}
      />
      <CustomInput
        label="Email"
        keyboardType="email-address"
        name="email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <View>
        <CustomInput
        icon="lock"
          label="Choose a password"
          placeholder="+ 8 characters, one letter and one number."
          name="password"
          secureTextEntry={secureTextEntry1}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor="rgba(0, 0, 0, 0)"
          style={{ position: "absolute", right: 5, bottom: 5 }}
          onPress={() => setSecureTextEntry1(!secureTextEntry1)}
        >
          <Ionicons
            name={secureTextEntry1 === false ? "eye-off" : "eye"}
            color="black"
            size={25}
          />
        </TouchableHighlight>
      </View>
      <View>
        <CustomInput
        icon="lock"
          label="Confirm your password"
          placeholder="password"
          name="password"
          secureTextEntry={secureTextEntry2}
          onChangeText={(text) => setPasswordConfirm(text)}
          value={passwordConfirm}
        />
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor="rgba(0, 0, 0, 0)"
          style={{ position: "absolute", right: 5, bottom: 5 }}
          onPress={() => setSecureTextEntry2(!secureTextEntry2)}
        >
          <Ionicons
            name={secureTextEntry2 === false ? "eye-off" : "eye"}
            color="black"
            size={25}
          />
        </TouchableHighlight>
      </View>
      <Text>Welcome</Text>
      <Button onPress={() => register()} title="s'enregistrer" />
    </View>
  );
}

const styles = StyleSheet.create({});
