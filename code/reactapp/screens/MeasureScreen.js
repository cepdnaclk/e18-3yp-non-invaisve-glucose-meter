import React from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

import CircularProgress from "../components/ProgressIndicator";
import ListView from "../components/ListView";

const recentMeasurements = [ {
	id: "1",
	name: "Earnest Green",
    value: "23",
  },
  {
	id: "2",
	name: "Winston Orn",
    value: "23",
  },
  {
	id: "3",
	name: "Carlton Collins",
    value: "23",
  },
  {
  id: "4",
	name: "Nethmi",
    value: "23",
  },
  {
  id: "5",
	name: "Nethmi",
    value: "23",
  },
  {
  id: "6",
	name: "Nethmi",
    value: "23",
  }, ];

export default function App() {
  return (
    <View style={styles.container}>

    <View style={styles.top}>
      
    </View>
        
    <View style={styles.progress}>

    <CircularProgress value={50}/>
    <Text style={styles.glucose}>Blood Glucose Concentration</Text>
    </View>


    <View style={styles.recent}>
      <ListView datalist={recentMeasurements}/>
    </View>
    
    </View>

    

  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#8fa5e3",
    },
    top: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0.5,
  },

    progress: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
    },
    recent: {
        //alignItems: 'center',
        padding: 20,
        paddingLeft: 30,
        flex: 1.5,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        
    },
    glucose: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 15,
      marginTop: 12,
      fontWeight: 'bold',
      color: "#000",
  },

  
  });
