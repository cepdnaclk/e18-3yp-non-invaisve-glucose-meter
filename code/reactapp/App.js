import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterScreen from "./screens/RegisterScreen";
import RegisterScreen1 from "./screens/RegisterScreen1";
// import GraphScreen from "./screens/GraphScreen";
import MeasureScreen from "./screens/MeasureScreen";
import LoginScreen from "./screens/LoginScreen";
// import PrivacyScreen from "./screens/PrivacyScreen";
// import Button from "./components/RoundButton";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
          
        />
        <Stack.Screen name="RegisterScreen1" component={RegisterScreen1} options={{ headerShown: false }}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="MeasureScreen" component={MeasureScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
   //  <RegisterScreen/>
  );
};
export default App;