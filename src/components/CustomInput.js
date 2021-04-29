import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableHightlight, TouchableWithoutFeedback } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import utils, { colors, layout } from "../config/utils";

const UserInput = (props) => {
  return (
    <View style={{ marginTop: 10 }}>
      <View style={{ flexDirection: "row" }}>
        {props.icon && (
          <Ionicons
            style={styles.icon}
            name={props.icon}
            color="#A2A2A2"
            size={20}
          />
        )}
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <TextInput
        style={styles.userInput}
        keyboardType={props.keyboardType}
        defaultValue={props.defaultValue}
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
        borderColor={props.borderColor ?? colors.primary}
        width={props.width ?? layout.width}
      />
      {props.error && <Text style={styles.error}>{props.error}</Text>}
    </View>
  );
};

const SearchInput = (props) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.searchInput}>
        <TouchableWithoutFeedback style={{ width: "7%"}} onPress={props.onPress}>
          <View>
            <Ionicons
              style={styles.icon}
              name={props.icon}
              color="black"
              size={20}
            /></View>
        </TouchableWithoutFeedback>
        <View style={{ width: "85%" }}>
          <TextInput
            keyboardType={props.keyboardType}
            editable={props.editable ?? true}
            value={props.value}
            defaultValue={props.defaultValue}
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
            borderColor={props.borderColor ?? colors.primary}
            width={props.width ?? layout.width}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    justifyContent: "center"
  },
  label: {
    fontStyle: "italic",
    fontSize: 15,
    marginLeft: 10,
  },
  userInput: {
    width: layout.width,
    paddingHorizontal: 10,
    backgroundColor: "#E1E1E1",
    alignItems: "center",
    borderRadius: 25, 
    paddingLeft: 10
  },
  searchInput: {
    flexDirection: "row", backgroundColor: "#E1E1E1", alignItems: "center", borderRadius: 25, paddingLeft: 10 
  },
  error: {
    color: "red",
    fontSize: 12,
  },
});

export { UserInput, SearchInput };
