import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createMaterialBottomTabNavigator();

// screens
import GraphScreen from "../GraphScreen";
import MeasureScreen from "../MeasureScreen";
import DoctorScreen from "../AddDoctor";

export default function MyTabs() {
  return (
    
    <Tab.Navigator
      initialRouteName="MeasureScreen"
      activeColor="#000"
      shifting={true}
    >
      <Tab.Screen
        name="Home"
        component={MeasureScreen}
        options={{
          title: "history",
          headerShown: true,
          tabBarLabel: "History",
          tabBarColor: "#8fa5e3",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"ios-home"} size={18} color={"#000"} />
          ),
        }}
      />
      <Tab.Screen
        name="Requests"
        component={GraphScreen}
        options={{
          title: "Home",
          headerTransparent: true,
          headerShown: true,
          tabBarLabel: "Home",
          tabBarColor: "#8fa5d3",
          // tabBarBadge: 9,
          tabBarIcon: ({ color }) => (
            <Ionicons name={"ios-water"} size={25} color={"#000"} />
          ),
          tabPress: () => console.log("hello"),
        }}
      />

<Tab.Screen
        name="Doctor"
        component={DoctorScreen}
        options={{
          title: "Doctor",
          headerTransparent: true,
          headerShown: true,
          tabBarLabel: "Doctor",
          tabBarColor: "#8fa5e3",
          // tabBarBadge: 9,
          tabBarIcon: ({ color }) => (
            <Ionicons name={"ios-medkit"} size={18} color={"#000"} />
          ),
          tabPress: () => console.log("hello"),
        }}
      />
    </Tab.Navigator>
  );
}