import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
  Image,
} from "react-native";
import { Formik } from "formik";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRoute } from '@react-navigation/native';
import SelectDropdown from "react-native-select-dropdown";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import WelcomeHeader from "../components/PageTopText";
import AppFormField from "../components/AppFormField";
import Button from "../components/MainButton";
import client from "../API/client";

function RegisterScreen({navigation, route}) {
 
  const selectGender = ["Female", "Male"];
  const [selected, setSelected] = React.useState("");

    const successAlert = (msg) =>
    Alert.alert("User Added Successfully!", "Now you can login to the system",
    [
      {
        text: "OK",
        onPress: () => navigation.navigate("LoginScreen")
        
      },
    ]);

  const notsuccessAlert = (msg) =>
    Alert.alert("Failed!", msg,
    [
      {
        text: "OK",
        onPress: () => {if (msg=="This Email already in use.") {navigation.navigate("RegisterScreen")} else {navigation.navigate("LoginScreen")}}
        
      },
    ]);

  const action = async (values, formikActions) => {
    
    const res = await client
      .post("/auth/mobile/signup", {
        ...values,
        username: route.params.user.username,
        contact_no: route.params.user.contact_no,
        email: route.params.user.email,
        password: route.params.user.password,
      })
      .catch((error) => {
        //notsuccessAlert(res.data.message);
        console.log("error");
      });
    console.log(res.data);
    if (res.data.success) {
      console.log(typeof res.data.message)
      successAlert(res.data.message);
      
    } else {
      console.log("here2")
      notsuccessAlert(res.data.message);
     
    }
  };
  
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
      <Formik
        initialValues={{
          
          age: "",
          height: "",
          weight: "",
          gender: ""
        }}
        onSubmit={action}
        // validationSchema={validationSchema}
      >
        {({ handleSubmit, values }) => {
          const {
          
          age,
          height,
          weight,
          gender
          } = values;

          return (
            <>
              <View >
                <KeyboardAwareScrollView>
            

                  <AppFormField
                    value={height}
                    isSecured={false}
                    
                    iconName="totop"
                    iconSize={20}
                    hint={"Height/ cm"}
                    name="height"
                    keyboadType="number"
                  />

                  <AppFormField
                    value={weight}
                    hint={"Weight/ kg"}
                    isSecured={false}
                    iconName="dashboard"
                    iconSize={20}
                    name="weight"
                    keyboadType="number"
                    // textContentType="number"
                  />
                  <View style={styles.selectOptionContainer}>
                    <SelectDropdown
                      data={selectGender}
                      // placeholder={"hint"}
                      defaultButtonText={"Select Gender"}
                      onSelect={(selectedItem, index) => {
                        values.gender = selectedItem;
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      renderDropdownIcon={() => {
                        return (
                          <IconAntDesign
                            name={"down"}
                            style={{ paddingStart: 5 }}
                          />
                        );
                      }}
                      dropdownIconPosition={"left"}
                      buttonStyle={styles.dropdownBtnStyle}
                      buttonTextStyle={styles.dropdownBtnTxtStyle}
                      dropdownStyle={styles.dropdownDropdownStyle}
                      rowStyle={styles.dropdownRowStyle}
                      rowTextStyle={styles.dropdownRowTxtStyle}
                      selectedRowStyle={styles.dropdownSelectedRowStyle}
                    />
                  </View>

                  <AppFormField
                    value={age}
                    hint={"Age"}
                    isSecured={false}
                    iconName="calendar"
                    iconSize={20}
                    name="age"
                    keyboadType="number"
                  />

                 
                </KeyboardAwareScrollView>
              </View>

              <View style={styles.button}>
                <Button
                  iconName={"adduser"}
                  iconSize={20}
                  text="Register"
                  onPress={handleSubmit}
                />
              </View>
            </>
          );
        }}
      </Formik>
        
        
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
    flex: 1.5,
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
  selectOptionContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownBtnStyle: {
    borderColor: "#edeff2",
    height: 50,
    width: "90%",
    borderRadius: 15,
    backgroundColor: "#edeff2",
    marginBottom: 10,
  },
  dropdownBtnTxtStyle: {
    color: "#000",
    fontSize: 14,
    textAlign: "left",
    paddingStart: 15,
  },
  dropdownDropdownStyle: {
    backgroundColor: "#edeff2",
    borderRadius: 12,
    height: 100,
  },
  dropdownRowStyle: {
    backgroundColor: "#edeff2",
    borderBottomColor: "#C5C5C5",
  },
  dropdownRowTxtStyle: {
    color: "#000",
    textAlign: "center",
    // fontWeight: "bold",
  },
});

export default RegisterScreen;
