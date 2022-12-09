import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import PrivacyScreen from "./screens/PrivacyScreen";
import RegisterScreen2 from "./screens/RegisterScreen2";
import Progress from "./screens/MeasureScreen";
import FlatList from "./components/ListView";

export default function App() {
  return (
    <Progress></Progress>
    
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
