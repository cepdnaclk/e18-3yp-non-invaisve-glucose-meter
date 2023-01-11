import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
} from 'react-native';
import Button from '../components/MainButton';
import client from '../API/client';
import client2 from '../API/clientRefreshToken';
import { useLogin } from "../context/LoginProvider";

function PrivacyScreen(props) {
  const [doctorcode, onChangeCode] = React.useState('');
  const [doctorname, onChangeName] = React.useState('');

  const {user, setUser, setIsLoggedIn, setRole} = useLogin();

  async function deleteToken(key) {
    await AsyncStorage.deleteItemAsync(key);
  }

  const logout = async () => {
    const res = await client2.post('/auth/mobile/logout', {}).catch(error => {
      console.log('error: ' + error.message);
    });
    console.log(AsyncStorage.getItem("refresh"))
    deleteToken('access');
    deleteToken('refresh');
    setIsLoggedIn(false);
    setRole(0);
    setUser({});
  };

  const createAlert1 = msg =>
    Alert.alert('Are You Sure you want to subscribe to', msg, [
      {text: 'YES', onPress: addDoc},
    ]);

  const createAlert2 = msg =>
    Alert.alert('Failed', msg, [
      {text: 'OK', onPress: console.log('alert ok')},
    ]);

  const addDoc = async () => {
    const res = await client
      .post('/doctor/subscribeDoc', {
        doctorcode,
      })
      .catch(error => {
        console.log('error ' + error.message);
      });
  };

  const getDoc = async () => {
    const res = await client
      .post('/doctor/getDoctor', {
        doctorcode,
      })
      .catch(error => {
        console.log('error ' + error.message);
      });
    if (res.data.success) {
      createAlert1(res.data.doctor);
    } else {
      createAlert2(res.data.message);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeCode}
          placeholder="Enter the code to add a doctor ..."
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.topContainer}></View>
        <View style={styles.bottomContainer}>
          <Button text="Subscribe" onPress={getDoc} />
          {/* when subscribe is pressed, addDoc should be called and the doctor code should be sent with the req */}
          <Button text="Logout" onPress={logout} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 30,
  },
  buttonContainer: {
    flex: 3,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flex: 2,
  },
  bottomContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    backgroundColor: 'grey',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
});

export default PrivacyScreen;
