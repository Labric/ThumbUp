import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Keyboard,
  TouchableHighlight,
  Image,
} from "react-native";
import { firestore, auth, firebase } from "../../config/FirebaseConfig";
import * as yup from "yup";
import { UserInput } from "../../components/CustomInput";
import Ionicons from "react-native-vector-icons/Ionicons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImagePicker from "react-native-image-picker";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../../config/utils";

export default function EditProfile({ navigation, user }) {
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [age, setAge] = useState(user.age);
  const [phone, setPhone] = useState(user.phone);
  const [errorFirstname, setErrorFirstname] = useState("");
  const [errorLastname, setErrorLastname] = useState("");
  const [errorAge, setErrorAge] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  //const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(user.profilePicture);
  const [carPic, setCarPic] = useState(user.carPicture);
  const [carBrand, setCarBrand] = useState(user.carBrand)
  const [carModel, setCarModel] = useState(user.carModel)
  const [description, setDescription] = useState(user.description)
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
  const openLibraryUser = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      setImage(response.uri);
      return response.uri;
    });
  };
  const openLibraryCar = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      setCarPic(response.uri);
      return response.uri;
    });
  };

  // const openCamera = async () => {
  //   setModalVisible(false);
  //   ImagePicker.launchCamera(options, (response) => {
  //     console.log(response);
  //     setImage(response.uri);
  //     return response.uri;
  //   });
  // };

  const uploadImageAsync = async (uri) => {
    const ref = firebase
      .app()
      .storage("gs://thumbup-ee2fe.appspot.com/")
      .ref("images/" + currentUser.uid + Math.random() * 1000 + ".jpg");
    const task = ref.putFile(uri, {
      cacheControl: "no-store",
    });
    return task.then(async () => {
      const imageUserURL = await ref.getDownloadURL();
      return { imageUserURL };
    });
  };
  const uploadCarPicAsync = async (uri) => {
    const ref = firebase
      .app()
      .storage("gs://thumbup-ee2fe.appspot.com/")
      .ref("images/" + currentUser.uid + Math.random() * 1000 + ".jpg");
    const task = ref.putFile(uri, {
      cacheControl: "no-store",
    });
    return task.then(async () => {
      const imageCarURL = await ref.getDownloadURL();
      return { imageCarURL };
    });
  };

  // USER DATA HANDLER
  const CreateUser = async () => {
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
          carBrand: carBrand,
          carModel: carModel,
          description: description,
        };
        if (image) {
          const { imageUserURL } = await uploadImageAsync(image);
          payload.profilePictureURL = imageUserURL;
        }
        if (carPic) {
          const { imageCarURL } = await uploadCarPicAsync(carPic);
          payload.carPictureURL = imageCarURL;
        }
        await dispatchProfile(payload).then(
          alert("Profile correctly updated !")
        );
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const dispatchProfile = (payload) => {
    if (!currentUser) return;
    return firestore.collection("Users").doc(currentUser.uid).update({
      firstname: payload.firstname,
      lastname: payload.lastname,
      age: payload.age,
      phone: payload.phone,
      profilePicture: payload.profilePictureURL,
      carBrand: payload.carBrand,
      carModel: payload.carModel,
      carPicture: payload.carPictureURL,
      description: payload.description
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
          onPress={() => openLibraryUser()}
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
        defaultValue={user.firstname ? user.firstname : ""}
        onChangeText={(text) => setFirstname(text)}
        error={errorFirstname !== "" && errorFirstname}
        onFocus={() => setErrorFirstname("")}
      />
      <UserInput
        label="Lastname"
        name="lastname"
        defaultValue={user.lastname ? user.lastname : ""}
        onChangeText={(text) => setLastname(text)}
        error={errorLastname !== "" && errorLastname}
        onFocus={() => setErrorLastname("")}
      />
      <UserInput
        label="Age"
        keyboardType="numeric"
        name="age"
        value={age}
        onChangeText={(text) => setAge(text)}
        error={errorAge !== "" && errorAge}
        onFocus={() => setErrorAge("")}
      />
      <UserInput
        label="Phone number"
        keyboardType="numeric"
        name="phone"
        defaultValue={user.phone ? user.phone : ""}
        onChangeText={(text) => setPhone(text.replace(/[,.-\s]/g, ""))}
        error={errorPhone !== "" && errorPhone}
        onFocus={() => setErrorPhone("")}
      />

      <View
        style={{
          width: "100%",
          height: 2,
          backgroundColor: "grey",
          marginVertical: 15,
        }}
      />

      <View style={{ flexDirection: "row", width: "100%" }}>
        <TouchableHighlight
          style={{
            backgroundColor: "pink",
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            
          }}
          onPress={() => openLibraryCar()}
        >
          {!carPic ? (
            <Ionicons name="car" size={30} color="black" />
          ) : (
            <Image
              source={{ uri: carPic }}
              resizeMode="cover"
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
          )}
        </TouchableHighlight>
        
          <TextInput 
            style={{borderBottomWidth: 1, flex: 1, marginHorizontal: 10, backgroundColor: "#E8E8E8"}}
            placeholder="Car Brand"
            value={carBrand}
            onChangeText={(text) => setCarBrand(text)}
             />
          <TextInput 
            style={{borderBottomWidth: 1, flex: 1, marginHorizontal: 10, backgroundColor: "#E8E8E8"}}
            placeholder="Car Model"
            value={carModel}
            onChangeText={(text) => setCarModel(text)}
             />

          
        
      </View>
             <TextInput 
             placeholder="description..."
              multiline={true}
              numberOfLines={4}
              value={description}
              onChangeText={(text) => setDescription(text)}
              style={{backgroundColor: colors.secondary, marginTop: 10, borderRadius: 10}}
             />
      <Button onPress={() => CreateUser(navigation)} title="Complete profile" />

      {/* {modalVisible && (
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
              onPress={(car, user) => {
                openLibraryUser(user);
                openLibraryCar(car)
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
      )} */}
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
