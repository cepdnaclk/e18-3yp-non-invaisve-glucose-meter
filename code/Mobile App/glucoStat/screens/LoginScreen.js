import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

import WelcomeHeader from "../components/PageTopText";
import InputField from "../components/InputBox_1";
import Button from "../components/MainButton";
import GradButton from "../components/GradientButton";

function LoginScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeText}>
        <WelcomeHeader topLine="Hey there," bottomLine="Welcome Back" />
      </View>
      <View style={styles.inputs}>
        <InputField
          hint="Email"
          isSecured={false}
          iconName="mail"
          iconSize={20}
        />
        <InputField
          hint="Password"
          isSecured={true}
          iconName="lock"
          iconSize={20}
        />
        <Text style={{ textAlign: "center", marginTop: 5, color: "grey" }}>Forgot Password?</Text>
      </View>

      <View style={styles.button}>
        <GradButton
          text="Login"
          iconName="login"
          iconSize={20}
          onPress={() => console.log("Login")}
        />
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          Don't have an Account?{" "}
          <Text style={{ color: "purple" }}>Register</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  welcomeText: {
    flex: 1,
    paddingTop: 20,
  },

  inputs: {
    PaddingLeft: 10,
    PaddingRight: 10,
    paddingTop: 20,
    flex: 3,
  },

  button: {
    alignItems: "center",
    flex: 1,
  },
});

export default LoginScreen;
