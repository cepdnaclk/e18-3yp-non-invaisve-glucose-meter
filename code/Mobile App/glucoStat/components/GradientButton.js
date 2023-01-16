import React from "react";

import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { LinearGradient } from 'expo-linear-gradient';

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
      <LinearGradient
        colors={['skyblue', 'purple']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 1}}
        style={styles.btnLogin}
      >
        <TouchableHighlight
        onPress={onPress}
      >
        <Text style={styles.textLogin}>
          {" "}
          <IconAntDesign size={iconSize} name={iconName} /> {"  "}
          {text}{" "}
        </Text>
      </TouchableHighlight>
      </LinearGradient>
      
    </View>
  );
}

const styles = StyleSheet.create({
  btnLogin: {
    width: "80%",
    height: 55,
    justifyContent: "center",
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
