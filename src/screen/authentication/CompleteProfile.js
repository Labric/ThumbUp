import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Keyboard,
} from "react-native";

import { firestore, auth, firebase } from "../../config/FirebaseConfig";
import * as yup from "yup";
import CustomInput from "../../components/CustomInput";
import utils from "../../config/utils";

export default function CompleteProfile({navigation}) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState();
  const [phone, setPhone] = useState();
  const [errorFirstname, setErrorFirstname] = useState(false);
  const [errorLastname, setErrorLastname] = useState(false);
  const [errorAge, setErrorAge] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);

  // const isValidFirstname = (firstname) => {
  //   let schema = yup.string().required();
  //   return schema.isValidSync(firstname);
  // };
  // const isValidLastname = (lastname) => {
  //   let schema = yup.string().required();
  //   return schema.isValidSync(lastname);
  // };
  // const isValidAge = (age) => {
  //   let schema = yup.number().required().min(18);
  //   return schema.isValidSync(age);
  // };
  // const isValidPhone = (phone) => {
  //   let schema = yup.string().required().matches(/\d{10}/).max(10);
  //   let result = schema.isValidSync(phone);
  //   return result
  // };
  const { currentUser } = auth;
  console.warn(currentUser.uid);
  const CreateUser = async (navigation) => {
    Keyboard.dismiss();
    //(isValidFirstname() && isValidLastname() && isValidAge() && isValidPhone()) ? (
    try {
      const payload = {
        firstname: firstname,
        lastname: lastname,
        age: age,
        phone: phone,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      await dispatchProfile(payload).then(() => navigation.navigate("search"));
    } catch (err) {
      console.warn(err);
    }
  };

  const dispatchProfile = (payload) => {
    const { currentUser } = auth;
    if (!currentUser) return;
    return firestore
      .collection("Users")
      .doc(currentUser.uid)
      .set({ "firstname": payload.firstname, "lastname": payload.lastname, "age": payload.age, "phone": payload.phone});
  };

  return (
    <View>
      <CustomInput
        label="Firstname"
        name="firstname"
        onChangeText={(text) => setFirstname(text)}
        value={firstname.toLowerCase()}
        // onBlur={() =>
        //   !isValidFirstname(firstname)
        //     ? setErrorFirstname(true)
        //     : setErrorFirstname(false)
        // }
        error={errorFirstname && "Firstname required."}
      />
      <CustomInput
        label="Lastname"
        name="lastname"
        onChangeText={(text) => setLastname(text)}
        value={lastname.toLowerCase()}
        // onBlur={() =>
        //   !isValidLastname(lastname)
        //     ? setErrorLastname(true)
        //     : setErrorLastname(false)
        // }
        error={errorLastname && "Lastname required."}
      />
      <CustomInput
        label="Age"
        keyboardType="numeric"
        name="age"
        onChangeText={(text) => setAge(text)}
        value={age}
        // onBlur={() =>
        //   !isValidAge(age) ? setErrorAge(true) : setErrorAge(false)
        // }
        error={errorAge && "Age required and must be above 18."}
      />
      <CustomInput
        label="Phone number"
        keyboardType="numeric"
        name="phone"
        onChangeText={(text) => setPhone(text.replace(/[,.-\s]/g, ""))}
        value={phone}
        // onBlur={() =>
        //   !isValidPhone(phone) ? setErrorPhone(true) : setErrorPhone(false)
        // }
        error={errorPhone && "Phone number required and must have 10 numbers."}
      />

      <Button onPress={() => CreateUser(navigation)} title="Complete profile" />
    </View>
  );
}

const styles = StyleSheet.create({});
