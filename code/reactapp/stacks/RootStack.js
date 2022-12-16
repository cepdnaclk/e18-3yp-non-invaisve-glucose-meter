import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RegisterScreen1 from "../screens/RegisterScreen1";

const RootStack = createStackNavigator();

const RootStackScreens = ({ navigation }) => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="LoginScreen" component={LoginScreen} />
    <RootStack.Screen name="PrivacyScreen" component={PrivacyScreen} />
    <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
    <RootStack.Screen name="RegisterScreen1" component={RegisterScreen1} />
  </RootStack.Navigator>
);

export default RootStackScreens;