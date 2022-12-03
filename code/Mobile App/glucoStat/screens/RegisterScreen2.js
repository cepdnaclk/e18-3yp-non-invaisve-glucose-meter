import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
  Image,
} from "react-native";

import WelcomeHeader from "../components/PageTopText";
import InputField from "../components/InputBox_1";
import Button from "../components/MainButton";

function RegisterScreen(props) {
  return (
    <View style={styles.container}>
      
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/DetailsPageImage.png")}
        />
      </View>
      <View style={styles.welcomeText}>
        <WelcomeHeader topLine="Help us to know more about you" bottomLine="Let's Complete Your Profile" />
      </View>
      <View style={styles.inputs}>
        <InputField
          hint="Full Name"
          isSecured={false}
          iconName="user"
          iconSize={20}
        />
        <InputField
          hint="Contact Number"
          isSecured={true}
          iconName="phone"
          iconSize={20}
        />
        <InputField
          hint="Email"
          isSecured={false}
          iconName="mail"
          iconSize={20}
        />
        <InputField
          hint="Email"
          isSecured={false}
          iconName="mail"
          iconSize={20}
        />
        
      </View>

      <View style={styles.button}>
        <Button
          text="Register"
          
          iconSize={20}
          onPress={() => console.log("Login")}
        />
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer:{
    paddingTop: 30,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  image: {
    
    width: 150,
    height: 150,
  },

  welcomeText: {
    flex: 1,
    
  },

  inputs: {
    PaddingLeft: 10,
    PaddingRight: 10,
    paddingTop: 30,
    paddingBottom: 20,
    flex: 3,
    
  },

  button: {
    alignItems: "center",
    flex: 1,
    
  },
});

export default RegisterScreen;
