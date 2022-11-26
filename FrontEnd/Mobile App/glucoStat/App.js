import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Button from "./components/MainButton";
import WelcomeHeader from "./components/PageTopText";
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  return (
    //<WelcomeHeader topLine="Hey," bottomLine="Welcome Back" />
    
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
