import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { useLogin } from "../context/LoginProvider";
import RootStack from "../stacks/RootStack";
import MainStack from "../stacks/MainStack";

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <MainStack /> : <RootStack />;
};

export default MainNavigator;
