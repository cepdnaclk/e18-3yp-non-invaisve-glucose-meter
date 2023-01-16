import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import PrivacyScreen from "./screens/PrivacyScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RegisterScreen2 from "./screens/RegisterScreen2";
import MeasureScreen from "./screens/MeasureScreen";
import GraphScreen from "./screens/GraphScreen";

export default function App() {
  return (
    <PrivacyScreen></PrivacyScreen>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
