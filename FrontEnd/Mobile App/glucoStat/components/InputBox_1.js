// for the icon + textInput

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";

import colours from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// for icons search in --> https://oblador.github.io/react-native-vector-icons/
import IconAntDesign from "react-native-vector-icons/AntDesign";

// isSecured - pass true if a password field
function InputField({
  isSecured,
  hint,
  iconName,
  iconSize,
  showImage,
  password,
  ...otherProps
}) {
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.outerFelx}>
        <View style={styles.iconFlex}>
          <IconAntDesign size={iconSize} name={iconName} />
        </View>

        <View style={styles.textinputFlex}>
          <TextInput
            secureTextEntry={isSecured && !show ? true : false}
            style={styles.input}
            {...otherProps}
            padding={10}
            placeholder={hint}
          ></TextInput>
        </View>

        <TouchableOpacity style={styles.eye} onPress={() => setShow(!show)}>
          {password && (
            <MaterialCommunityIcons
              name={show ? "eye-off-outline" : "eye-outline"}
              size={25}
              color={colours.gray}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  outerFelx: {
    // justifyContent: "center",
    // alignItems: "center",
    // marginEnd: 10,
    // marginStart: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#edeff2", // ash
    height: 50,
    width: "90%",
    borderRadius: 15,
    justifyContent: "center",
  },
  eye: {
    position: "absolute",
    right: 15,
  },
  show: {
    paddingRight: 15,
  },

  input: {
    width: "100%",
    // borderRadius: 15,
  },

  // icon and tedxtinput is divided into flexes of 1:8 ratio in horizontal direction
  iconFlex: {
    flex: 1,
    alignItems: "center",
  },

  textinputFlex: {
    flex: 8,
    alignItems: "center",
  },
});

export default InputField;
