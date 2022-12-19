import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import LoginProvider from './context/LoginProvider';
import MainNavigator from './navigator/LoginNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <LoginProvider>
        <MainNavigator />
      </LoginProvider>
    </NavigationContainer>
  );
}

// import Doctor from "./screens/AddDoctor";
// import GraphScreen from "./screens/GraphScreen";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>

//         <Stack.Screen name="Doctor" component={Doctor} options={{ headerShown: false }}/>
//         {/* <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//    //  <RegisterScreen/>
//   );
// };
// export default App;
