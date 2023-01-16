import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
  Image,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import WelcomeHeader from "../components/PageTopText";
import InputField from "../components/InputBox_1";
import Button from "../components/MainButton";

function RegisterScreen(props) {
  const selectGender = ["Female", "Male"];
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
          hint="Age"
          isSecured={false}
          iconName="calendar"
          iconSize={20}
        />
        <View style={styles.selectOptionContainer}>
                    <SelectDropdown
                      data={selectGender}
                      // placeholder={"hint"}
                      defaultButtonText={"Select Gender"}
                      onSelect={(selectedItem, index) => {
                        //values.patient_gender = selectedItem;
                        console.log(selectedItem);
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
        <InputField
          hint="Height/ kg"
          isSecured={true}
          iconName="totop"
          iconSize={20}
        />
        <InputField
          hint="Weight/ cm"
          isSecured={false}
          iconName="dashboard"
          iconSize={20}
        />
        
        
      </View>

      <View style={styles.button}>
        <Button
          text="Register"
          iconName="adduser"
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
