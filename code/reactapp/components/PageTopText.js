// headers like - Hey there, Welcome Back

import React from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";

const screenHeader = ({ topLine, bottomLine }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.topLine}>{topLine}</Text>
      <Text style={styles.heading}>{bottomLine}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },

  topLine: {
    marginTop: 5,
    fontWeight: "500",
    color: "#000",
  },
});

export default screenHeader;
