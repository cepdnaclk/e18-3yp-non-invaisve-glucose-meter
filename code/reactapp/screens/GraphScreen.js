import React from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

import LineChart from "../components/LineChart";
import color from "../config/colors";

const months = ["January", "February", "March", "April", "May", "June"]
const values = [20, 45, 28, 80, 99, 100, 4]

export default function App() {
  return (
    <View style={styles.container}>

    <View style={styles.top}>
    </View>
        
    <View style={styles.chart}>
    <LineChart 
    x_datalist={months}
    y_datalist={values}
    x_unit={" m"}/>
    </View>

    <View style={styles.params}>

      <View style={styles.first}>
        <Text style={styles.topics}> Monthly Average </Text>
        <Text style={styles.date}> November </Text>
        <Text style={styles.value}> 127 mgH </Text>


      </View>
      <View style={styles.second}>
      <View style={styles.up}>
        <Text style={styles.topics}> Highest </Text>
        <Text style={styles.date}> 22/11/2022 </Text>
        <Text style={styles.value}> 127 <Text style={styles.unit}> mgH </Text></Text>
        
        </View>
        <View style={styles.down}>
        <Text style={styles.topics}> Lowest </Text>
        <Text style={styles.date}> 22/11/2022 </Text>
        <Text style={styles.value}> 127 mgH </Text>
        
      </View>
        
      </View>
      

    
    </View>
    {/* </LinearGradient> */}


    </View>

    

  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.primary,
      
    },
    top: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0.5,
  },

    chart: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
    },
    params: {
      //alignItems: 'center',
      padding: 20,
      paddingLeft: 30,
      flex: 2,
      backgroundColor: "#F7F7F7",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      flexDirection: "row",
  },
  first: {
    flex: 1,
    backgroundColor: "#fff",
    marginVertical: 10,
    marginLeft: 5,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    
    

  },
  second: {
    flex: 1,
    flexDirection: "column",

  },
  up: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    

  },  
  down: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    

  },    
  topics: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    color : color.text,
  },
  date: {
    fontSize: 15,
    fontWeight: "bold",
    color: color.primary,
    color : color.primary,
    
  },
  value: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
    color : color.text,
    
  },
  unit: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    
  },
  
  });
