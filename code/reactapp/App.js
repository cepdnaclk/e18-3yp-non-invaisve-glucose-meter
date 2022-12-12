import { StyleSheet, Text, View } from "react-native";

import RegisterScreen from "./screens/RegisterScreen";
import RegisterScreen1 from "./screens/RegisterScreen1";
import GraphScreen from "./screens/GraphScreen";
import MeasureScreen from "./screens/MeasureScreen";
import LoginScreen from "./screens/LoginScreen";
import PrivacyScreen from "./screens/PrivacyScreen";
import Button from "./components/RoundButton";

export default function App() {
  return (
      <PrivacyScreen ></PrivacyScreen> 
    
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
