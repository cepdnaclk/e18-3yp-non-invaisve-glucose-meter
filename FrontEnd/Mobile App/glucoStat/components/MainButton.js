import React from "react";

import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";

export default function submitButton({
  text,
  iconName,
  iconSize,
  onPress,
  style = { width: "80%", alignItems: "center" },
  btnstyle,
}) {
  return (
    <View style={style}>
      <TouchableHighlight
        style={[styles.btnLogin, btnstyle]}
        underlayColor="#fff"
        onPress={onPress}
      >
        <Text style={styles.textLogin}>
          {" "}
          <IconAntDesign size={iconSize} name={iconName} /> {"  "}
          {text}{" "}
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  btnLogin: {
    width: "80%",
    height: 55,
    justifyContent: "center",
    backgroundColor: "#8fa5e3",
    borderRadius: 30,
    marginVertical: 5,
  },

  textLogin: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});
