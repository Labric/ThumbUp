import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, View, Button } from "react-native";
import { set } from "react-native-reanimated";
import { SearchInput } from "../components/CustomInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment"
import  {layout}  from "../config/utils"
import GoogleMaps from "../components/GoogleMaps";
import { firestore, auth, firebase } from "../config/FirebaseConfig";


export default function AddTravel() {
  const [depart, setDepart] = useState("");
  const [step, setStep] = useState([]);
  const [dest, setDest] = useState("");
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState()
  const [mode, setMode] = useState("date")
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dateString = moment(date).format("MMMM Do YYYY").toString()
  const hourString = moment(hour).format("hh:mm").toString()
  const getFullDate = dateString + " at " + hourString


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if(mode === "date") {
        setDate(currentDate)
        setMode("time")
    } else {
        setShowDatePicker(false)
        setHour(currentDate)
        setMode("date")
    }

}
const { currentUser } = auth;
const addTravel = async () => {
  try {
    const payload = {
      depart,
      step,
      dest,
      getFullDate,
      createdBy : currentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await dispatchTravel(payload);
  } catch (err) {
    console.warn(err);
  }
  }
  const dispatchTravel = (payload) => {
    if (!currentUser) return;
    return firestore
      .collection("Travel")
      .doc(currentUser.uid + Math.ceil(Math.random() * 10000))
      .set({ "depart": payload.depart, "step": payload.step, "dest": payload.dest, "date": payload.getFullDate, "createdBy": payload.createdBy, "createdAt": payload.createdAt});
  };

  return (
    <View>
      <View>
        <SearchInput
          label={"Select your departure"}
          placeholder={"Paris"}
          icon={"search"}
          value={depart}
          
          onChangeText={(text) => setDepart(text)}
        />
        <SearchInput
          label={"Add steps"}
          placeholder={"Orléans"}
          icon={"search"}
          value={step}
          onChangeText={(text) => setStep(text)}
        />
        <SearchInput
          label={"Select your destination"}
          placeholder={"Clermond-Ferrand"}
          icon={"search"}
          value={dest}
          onChangeText={(text) => setDest(text)}
        />

        <SearchInput 
        icon={"calendar-sharp"}
        onPress={() => setShowDatePicker(true)}
        defaultValue={getFullDate}
        />

        {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />)}
      </View>
      <View style={{width: layout.width, height: layout.width * 0.7, backgroundColor: "pink"}} >
          <GoogleMaps dest={dest} depart={depart} step={step} />
      </View>
      <Button title="add" onPress={() => addTravel()} />
    </View>
  );
}

const styles = StyleSheet.create({});
