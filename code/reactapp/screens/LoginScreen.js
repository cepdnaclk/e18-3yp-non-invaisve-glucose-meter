import React, {createContext, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {AsyncStorage} from 'react-native';
import {Formik} from 'formik';
import {NavigationContainer} from '@react-navigation/native';
import * as Yup from 'yup';

import WelcomeHeader from '../components/PageTopText';
import InputField from '../components/InputBox_1';
import AppFormField from '../components/AppFormField';
import Button from '../components/MainButton';
import MeasureScreen from './MeasureScreen';
import GraphScreen from './GraphScreen';
import client from '../API/client';
import {useLogin} from '../context/LoginProvider';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).max(12).label('Password'),
});

function LoginScreen({navigation}) {
  const {setIsLoggedIn, setUser, setRole} = useLogin();

  async function saveToken(key, val) {
    try {
      await AsyncStorage.setItem(key, val);
    } catch (error) {
      console.log('error storing the auth token');
    }
  }

  const createAlert = msg =>
    Alert.alert('Login Denied', msg, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const login = async (values, formikActions) => {
    formikActions.resetForm();

    const res = await client
      .post('/auth/mobile/login', {
        ...values,
      })
      .catch(error => {
        return createAlert(error.message);
        console.log('error ' + error.message);
      });
    // console.log(res.data.user);
    if (res.data.success) {
      console.log(res.data);
      saveToken('access', res.data.access_token);
      saveToken('refresh', res.data.refresh_token);

      setRole(3);
      setIsLoggedIn(true);
      setUser(res.data.user);
      // navigation.navigate("GraphScreen");
    } else {
      createAlert(res.data.message);
    }
  };

  const [isSecured, setSecured] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.welcomeText}>
        <Text style={styles.mainTopic}>
          gluco<Text style={styles.mainTopic2}>Stat</Text>
        </Text>
        <WelcomeHeader topLine="Hey there," bottomLine="Welcome Back" />
      </View>
      <View style={styles.inputs}>
        <Formik initialValues={{email: '', password: ''}} onSubmit={login}>
          {({values, handleSubmit, handleChange}) => {
            const {email, password} = values;

            return (
              <>
                <View style={styles.inputFlex}>
                  {/* container with all the text input fields */}

                  {/* email input*/}
                  <AppFormField
                    value={values.email}
                    handleChange={handleChange('email')}
                    name="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    hint={'Email'}
                    iconName="mail"
                    iconSize={15}
                    isSecured={false}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                  />
                  {/* <ErrorMessage error={errors.email} visible={touched.email} /> */}

                  {/* password input */}
                  <AppFormField
                    value={password}
                    handleChange={handleChange('password')}
                    name="password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    hint="Password"
                    iconName="lock"
                    iconSize={15}
                    isSecured={isSecured}
                    password={true}
                    showImage={<Text>Show</Text>}
                    textContentType="password"
                  />
                </View>

                <View style={{height: '25%'}}></View>
                <View style={styles.button}>
                  <Button
                    text=" Login"
                    iconName={'login'}
                    iconSize={18}
                    onPress={handleSubmit}

                    // for testing purposes only👇
                    // onPress={() => {
                    //   handleSubmit;
                    //   navigation.navigate("AdminDoctor");
                    // }}
                  />
                  <Text style={{textAlign: 'center', marginTop: 10}}>
                    Don't have an Account?{' '}
                    <TouchableWithoutFeedback
                      onPress={() => navigation.navigate('RegisterScreen')}>
                      <Text style={{color: 'purple'}}>Register</Text>
                    </TouchableWithoutFeedback>
                  </Text>
                </View>
              </>
            );
          }}
        </Formik>
        {/* <Text style={{ textAlign: "center", marginTop: 5, color: "grey" }}>Forgot Password?</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  welcomeText: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },

  inputs: {
    PaddingLeft: 10,
    PaddingRight: 10,
    paddingTop: 20,
    flex: 3,
  },

  button: {
    alignItems: 'center',
    flex: 1,
  },
  mainTopic: {
    fontSize: 30,
    color: "#8fa5e3",
    fontWeight: "bold",
  },
  mainTopic2: {
    fontSize: 30,
    color: "red",

  },
});

export default LoginScreen;
