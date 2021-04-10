import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import utils from "../config/utils";

export default function CustomInput(props) {
  return (
    <View>
      {props.icon && (
        <Ionicons name={props.name} color="E1E1E1" size={25} />
      )}
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
      style={styles.input}
        keyboardType={props.keyboardType}
        editable={props.editable ?? true}
        value={props.value}
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
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
      fontStyle: "italic",
      fontSize: 15
  },
  input: {
    width: utils.width,
    backgroundColor: "E1E1E1"
  },
});
