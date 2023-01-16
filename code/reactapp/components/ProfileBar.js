import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {View} from 'react-native';
import {useLogin} from '../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyComponent({name, func}) {
  const {user, setUser, setIsLoggedIn, setRole} = useLogin();

  async function deleteToken(key) {
    await AsyncStorage.deleteItemAsync(key);
  }

  const logout = async () => {
    // const res = await client2.post('/auth/mobile/logout', {}).catch(error => {
    //   console.log('error: ' + error.message);
    // });
    console.log(AsyncStorage.getItem("refresh"))
    deleteToken('access');
    deleteToken('refresh');
    setIsLoggedIn(false);
    setRole(0);
    setUser({});
  };
  return (
    <Appbar.Header>
      <Appbar.Content title={name} />
      <Appbar.Action icon="dots-vertical" onPress={() => {logout()}} />
    </Appbar.Header>
  );
}
