import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import PrivacyScreen from "./screens/PrivacyScreen";
import RegisterScreen2 from "./screens/RegisterScreen2";

export default function App() {
  return (
    <RegisterScreen2></RegisterScreen2>
    
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
