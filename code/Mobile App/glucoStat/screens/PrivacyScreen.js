import React, {useState} from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import Button from "../components/RoundButton";

function PrivacyScreen(props) {
  const [isChecked, setChecked] = useState(false);
  return (
    <SafeAreaView style={styles.screen}>
      {/* <WelcomeHeader topLine="Hey there," bottomLine="Welcome Back" /> */}
      <View style={{ flex: 4 }}>
        <Image
          style={styles.image}
          source={require("../assets/PrivacyPageImage.png")}
        />
      </View>
      <View style={styles.footer}>
        
        <Text style={styles.heading}>Keep It Under Control</Text>
        <Text style={styles.text}>
          This is an app to track your blood glucose levels measured using GlucoStat Non-Invasive Glucometer.
        </Text>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#8fa5e3" : undefined}
          />
          <Text style={styles.paragraph}>By continuing you accept our</Text>
          <TouchableWithoutFeedback
            //onPress={() => navigation.navigate("GuidlinesScreen")}
            onPress={() => console.log('clicked')}
          >
            <Text style={styles.regTouch}> Terms of Use </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <View style={styles.ButtonContainer}>
        <Button
          iconName={"arrow-right"}
          iconSize={15}
          iconColor={"#fff"}
          onPress={() => {
            if (isChecked === false) {
              Alert.alert(
                "Please accept the Terms of use",
                "",

                [
                  {
                    text: "OK",
                    onPress: () => {},
                  },
                ]
              );
            } else {
              navigation.navigate("RegisterScreen");
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
  },
  footer: {
    flex: 2,
   // paddingTop: 40,
    margin: 30,
    
  },
  ButtonContainer: {
    
    position: "absolute",
    bottom: 10,
    alignSelf: "flex-end",
   
  },
  heading: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 21,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    marginEnd: 5,
    marginStart: 5,
  },
  image: {
    marginTop: 20,
    width: "100%",
    height: "100%",
  },
  section: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
  regTouch: {
    color: "#c25ced",
    marginLeft: 5,
    textDecorationLine: "underline",
  },
});

export default PrivacyScreen;
