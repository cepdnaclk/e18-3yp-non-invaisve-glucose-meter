import React from "react";

import { StyleSheet, TouchableHighlight } from "react-native";
import { color} from "../config/colors"
import IconAntDesign from "react-native-vector-icons/AntDesign";

export default function IconButton({ iconName, iconSize, onPress, iconColor }) {
  return (
    <TouchableHighlight style={styles.IconButton} onPress={onPress}>
      <IconAntDesign size={iconSize} name={iconName} color={iconColor}/>
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
