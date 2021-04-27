import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Keyboard,
  TouchableHighlight,
  Image,
  Modal,
  Platform,
  Text,
} from "react-native";
import { firestore, auth, firebase } from "../../config/FirebaseConfig";
import * as yup from "yup";
import { UserInput } from "../../components/CustomInput";
import Ionicons from "react-native-vector-icons/Ionicons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImagePicker from "react-native-image-picker";
import SignOut from "../../components/SignOut";
import AuthNavigation from "../../navigation/AuthNav";

export default function CompleteProfile({ navigation }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState();
  const [phone, setPhone] = useState();
  const [errorFirstname, setErrorFirstname] = useState("");
  const [errorLastname, setErrorLastname] = useState("");
  const [errorAge, setErrorAge] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [sendEmail, setSendEmail] = useState("");
  const { currentUser } = auth;

  // FORM VALIDATION
  const isValidFirstname = (firstname) => {
    let schema = yup.string().required().min(3);
    return schema.isValidSync(firstname);
  };
  const isValidLastname = (lastname) => {
    let schema = yup.string().required();
    return schema.isValidSync(lastname);
  };
  const isValidAge = (age) => {
    let schema = yup.number().required().min(18);
    return schema.isValidSync(age);
  };
  const isValidPhone = (phone) => {
    let schema = yup
      .string()
      .required(10)
      .matches(/\d{10}/);
    let result = schema.isValidSync(phone);
    return result;
  };

  // PICTURE HANDLER
  var ImagePicker = require("react-native-image-picker");
  const options = {
    maxWidth: 2000,
    maxHeight: 2000,
    mediaType: "photo",
    //cameraType: "front",
    //saveToPhotos: true,
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  };
  const openLibrary = () => {
    setModalVisible(false);
    ImagePicker.launchImageLibrary(options, (response) => {
      setImage(response.uri);
      return response.uri;
    });
  };

  const openCamera = async () => {
    setModalVisible(false);
    ImagePicker.launchCamera(options, (response) => {
      console.log(response);
      setImage(response.uri);
      return response.uri;
    });
  };

  const uploadImageAsync = async (uri) => {
    const ref = firebase
      .app()
      .storage("gs://thumbup-ee2fe.appspot.com/")
      .ref("images/" + currentUser.uid + ".jpg");
    const task = ref.putFile(uri, {
      cacheControl: "no-store",
    });
    return task.then(async () => {
      const imageURL = await ref.getDownloadURL();
      return { imageURL };
    });
  };

  // USER DATA HANDLER
  const CreateUser = async (navigation) => {
    Keyboard.dismiss();
    if (!isValidFirstname(firstname)) {
      setErrorFirstname(
        "Firstname is required and must contain at least 3 characters."
      );
    } else if (!isValidLastname(lastname)) {
      setErrorLastname("Lastname is required.");
    } else if (!isValidAge(age)) {
      setErrorAge("Age is required and must be up to 18.");
    } else if (!isValidPhone(phone)) {
      setErrorPhone("Phone is required and must contain at least 10 numbers.");
    } else {
      try {
        const payload = {
          firstname: firstname.toLowerCase(),
          lastname: lastname.toLowerCase(),
          age: age,
          phone: phone,
          id: currentUser.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        if (image) {
          const { imageURL } = await uploadImageAsync(image);
          payload.profilePictureURL = imageURL;
        }
        await dispatchProfile(payload).then(alert("Profile correctly updated !"));
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const dispatchProfile = (payload) => {
    if (!currentUser) return;
    return firestore.collection("Users").doc(currentUser.uid).set({
      firstname: payload.firstname,
      lastname: payload.lastname,
      age: payload.age,
      phone: payload.phone,
      profilePicture: payload.profilePictureURL,
      id: payload.id,
      createdAt: payload.createdAt,
    });
  };

  return (
    <View>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <TouchableHighlight
          style={{
            backgroundColor: "pink",
            width: 100,
            height: 100,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setModalVisible(true)}
        >
          {!image ? (
            <Ionicons name="camera-outline" size={30} color="black" />
          ) : (
            <Image
              source={{ uri: image }}
              resizeMode="cover"
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          )}
        </TouchableHighlight>
      </View>
      <UserInput
        label="Firstname"
        name="firstname"
        onChangeText={(text) => setFirstname(text)}
        value={firstname}
        error={errorFirstname !== "" && errorFirstname}
        onFocus={() => setErrorFirstname("")}
      />
      <UserInput
        label="Lastname"
        name="lastname"
        onChangeText={(text) => setLastname(text)}
        value={lastname}
        error={errorLastname !== "" && errorLastname}
        onFocus={() => setErrorLastname("")}
      />
      <UserInput
        label="Age"
        keyboardType="numeric"
        name="age"
        onChangeText={(text) => setAge(text)}
        value={age}
        error={errorAge !== "" && errorAge}
        onFocus={() => setErrorAge("")}
      />
      <UserInput
        label="Phone number"
        keyboardType="numeric"
        name="phone"
        onChangeText={(text) => setPhone(text.replace(/[,.-\s]/g, ""))}
        value={phone}
        error={errorPhone !== "" && errorPhone}
        onFocus={() => setErrorPhone("")}
      />

      <Button onPress={() => CreateUser(navigation)} title="Complete profile" />

      <SignOut />

      {modalVisible && (
        <Modal animationType="slide" transparent={true}>
          <View style={styles.modal}>
            <Button
              title="Take a picture /!\"
              onPress={() => {
                openCamera();
              }}
            />
            <Button
              title="Choose from the library"
              onPress={() => {
                openLibrary();
              }}
            />
            <Button
              title="close"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    height: 400,
    width: "100%",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
