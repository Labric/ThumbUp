import React from "react";
import { StyleSheet, Image } from "react-native";
import Screen from "../component/Screen";
import * as Yup from "yup";
import { AppFormField, SubmitButton } from "../component/forms";
import { Formik } from "formik";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen() {
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        {() => (
          <>
            <AppFormField
              icon="email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              name="email"
              placeholder="email"
              textContentType="emailAddress"
            />

            <AppFormField
              icon="lock"
              autoCapitalize="none"
              autoCorrect={false}
              name="password"
              placeholder="password"
              secureTextEntry
              textContentType="password"
            />

            <SubmitButton text="login" />
          </>
        )}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});
