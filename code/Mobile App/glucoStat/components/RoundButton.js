import React from "react";

import { StyleSheet, TouchableHighlight } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { color} from "../config/colors"

export default function IconButton({ iconName, iconSize, onPress, iconColor }) {
  return (
    <TouchableHighlight style={styles.IconButton} onPress={onPress}>
      <FontAwesome5 name={iconName} size={iconSize} color={iconColor} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  IconButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginVertical: 8,
    marginHorizontal: 20,
    backgroundColor: "#8fa5e3",
  },
});
