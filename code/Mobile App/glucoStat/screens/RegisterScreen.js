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

function RegisterScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeText}>
        <WelcomeHeader topLine="Hey there," bottomLine="Create an Account" />
      </View>
      <View style={styles.inputs}>
        <InputField
          hint="Full Name"
          isSecured={false}
          iconName="user"
          iconSize={20}
        />
        <InputField
          hint="Contact Number"
          isSecured={true}
          iconName="phone"
          iconSize={20}
        />
        <InputField
          hint="Email"
          isSecured={false}
          iconName="mail"
          iconSize={20}
        />
        <InputField
          hint="Password"
          isSecured={false}
          iconName="lock"
          iconSize={20}
        />
        <InputField
          hint="Confirm Password"
          isSecured={false}
          iconName="lock"
          iconSize={20}
        />
      </View>

      <View style={styles.button}>
        <Button
          text="Next"
          
          iconSize={20}
          onPress={() => console.log("Login")}
        />
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          Have an Account? {" "}
          <Text style={{ color: "purple" }}>Login</Text>
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

export default RegisterScreen;
