import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import utils from "../config/utils";

export default function CustomInput(props) {
  return (
    <View style={{marginTop: 10}} >
      <View style={{flexDirection: "row"}}>{props.icon && (
        <Ionicons style={styles.icon} name={props.icon} color="#A2A2A2" size={20} />
      )}
      <Text style={styles.label}>{props.label}</Text></View>
      <TextInput
      style={styles.input}
        keyboardType={props.keyboardType}
        editable={props.editable ?? true}
        value={props.value}
        onEndEditing={props.onEndEditing}
        autoCorrect={props.autoCorrect ?? false}
        autoCapitalize={props.autoCapitalize ?? "none"}
        autoCompleteType={props.autoCompleteType ?? "off"}
        autoFocus={props.autoFocus}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        underlineColorAndroid="#00000000"
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onKeyPress={props.onKeyPress}
        secureTextEntry={props.secureTextEntry}
        textAlignVertical={props.textAlignVertical}
        textContentType={props.textContentType}
        error={props.error}
        borderColor={props.borderColor ?? utils.primary}
        width={props.width ?? utils.width}
      />
      {props.error && (<Text style={styles.error}>{props.error}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
    icon: {
        //position: "absolute",
        bottom: 0
    },
  label: {
      fontStyle: "italic",
      fontSize: 15,
      marginLeft: 5
  },
  input: {
    width: utils.width,
    backgroundColor: "#E1E1E1",
    paddingHorizontal: 10
  },
  error: {
    color: "red",
    fontSize: 12
  }
});
