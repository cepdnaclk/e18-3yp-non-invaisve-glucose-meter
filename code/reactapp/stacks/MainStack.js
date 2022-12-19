import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreen from '../screens/tabScreen/BottomTab';

const MainStack = createStackNavigator();

const MainStackScreens = ({navigation}) => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerTransparent: false,
        headerShown: true,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily: 'serif',
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: '#f1f1f1',
        },
        headerTintColor: '#0b0070',
      }}>
      <MainStack.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerTransparent: true,
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainStackScreens;
