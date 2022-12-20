import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";

import WelcomeHeader from "../components/PageTopText";
import Button from "../components/MainButton";
import ErrorMessage from "../components/ErrorMessage";
import AppFormField from "../components/AppFormField";
import client from "../API/client";
import RegisterScreen1 from "./RegisterScreen1";


const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Full Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).max(12).label("Password"),
  confirmpassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

function RegisterScreen({navigation}) {
  const successAlert = () =>
    Alert.alert(
      "Request Sent Successfully!",
      "Please wait for the admin to accept your request.",
      [{ text: "OK", onPress: () => console.log("navigation not working") }]
    );

  const notsuccessAlert = (msg) =>
    Alert.alert("Request Sent Failed!", msg, [
      { text: "OK", onPress: () => console.log("navigation not working") },
    ]);

  const signUp = async (values, formikActions) => {
    console.log(values);
    navigation.navigate("RegisterScreen1", {user: values});
  
  };
  return (
    <View style={styles.container}>

      <WelcomeHeader topLine="Hey there," bottomLine="Create an Account" />

      <View style={styles.all}>
        <View style={styles.topFlex}>
          <Formik
            initialValues={{
              username: "",
              contact_no: "",
              email: "",
              password: "",
              confirmpassword: "",
            }}
            onSubmit={signUp}
            validationSchema={validationSchema}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              setFieldTouched,
              touched,
            }) => {
              const { username, contact_no, email, password, confirmpassword } =
                values;

              return (
                <>
                  <KeyboardAwareScrollView>
                    <AppFormField
                      value={username}
                      isSecured={false}
                      iconName="user"
                      iconSize={15}
                      hint={"Full Name"}
                      name="username"
                    />

                    <AppFormField
                      value={contact_no}
                      isSecured={false}
                      iconName="phone"
                      iconSize={15}
                      hint={"Contact Number"}
                      name="contact_no"
                    />

                    <AppFormField
                      value={email}
                      isSecured={false}
                      iconName="mail"
                      iconSize={15}
                      hint={"Email"}
                      name="email"
                      keyboardType="email-address"
                    />
                    <AppFormField
                      value={password}
                      name="password"
                      autoCapitalize="none"
                      autoCorrect={false}
                      hint="Password"
                      iconName="lock"
                      iconSize={15}
                      isSecured={true}
                      password={true}
                      showImage={<Text>Show</Text>}
                      textContentType="password"
                    />
                    <AppFormField
                      value={confirmpassword}
                      name="confirmpassword"
                      autoCapitalize="none"
                      autoCorrect={false}
                      hint="Confirm Password"
                      iconName="lock"
                      iconSize={15}
                      isSecured={true}
                      password={true}
                      showImage={<Text>Show</Text>}
                      textContentType="password"
                    />
                     
             
                    {/* container with the register button and text below */}
                    <View style={styles.submitButton}>
                      <Button
                        style={styles.btnPosition}
                        text="Next"
                        onPress={
                          handleSubmit
                          
                          }
                        iconName={"right"}
                      />
                    </View></KeyboardAwareScrollView>
                 
                </>
              );
            }}
          </Formik>
        </View>

        <View style={styles.bottomFlex}>
          <Text style={{ margin: 10 }}> or </Text>

          <Text>
            Already have an account?
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.regTouch}> Login </Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
      </View>
</View>
  );
}

const styles = StyleSheet.create({
  all: {
    // flex: 1,
    justifyContent: "space-between",
  },

  bottomFlex: {
    alignItems: "center",
    //marginBottom: "20%",
    justifyContent: "flex-end",
  },

  // btnPosition: {
  //   alignItems: "center",
  //   width: "80%",
  // },

  submitButton: {
    marginTop: "10%",
    alignItems: "center",
  },

  topFlex: {
    justifyContent: "center",
    marginTop: "10%",
    // alignItems: "center",
  },

  regTouch: {
    color: "#c25ced",
    marginLeft: 5,
  },
});


export default RegisterScreen;
