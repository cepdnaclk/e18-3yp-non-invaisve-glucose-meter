import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegisterScreen1 from '../screens/RegisterScreen1';

const RootStack = createStackNavigator();

const RootStackScreens = ({navigation}) => (
  <RootStack.Navigator>
    <RootStack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <RootStack.Screen
      name="PrivacyScreen"
      component={PrivacyScreen}
      options={{headerShown: false}}
    />
    <RootStack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{headerShown: false}}
    />
    <RootStack.Screen
      name="RegisterScreen1"
      component={RegisterScreen1}
      options={{headerShown: true}}
    />
  </RootStack.Navigator>
);

export default RootStackScreens;
