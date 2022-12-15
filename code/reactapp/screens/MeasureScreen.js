import React, { useEffect, useState } from "react";


import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import CircularProgress from "../components/ProgressIndicator";
import ListView from "../components/ListView";
import client from "../API/client";

// const recentMeasurements = [ {
// 	id: "1",
// 	name: "Earnest Green",
//     value: "23",
//   },
//   {
// 	id: "2",
// 	name: "Winston Orn",
//     value: "23",
//   },
//   {
// 	id: "3",
// 	name: "Carlton Collins",
//     value: "23",
//   },
//  ];

export default function App({navigation}) {
  const isFocused = useIsFocused();
  const [records, setRecords] = useState([{}]);
  const [isLoaded, setIsLoaded] = useState(false);
  // add a user state to change the array auto when screen laoded
  const d = new Date();
  //console.log(d.getMonth()); // 2022-12-14T06:49:47.203Z

  // const getRecent = async () => {
  
  //   const res = await client
  //     .get(`/glucose/getMonthlyGlucose/${d.getMonth()}`)
  //     .catch((error) => {
  //       return createAlert(error.message);
  //       console.log("error " + error.message);
  //     });
  //   // console.log(res.data.user);
  //   if (res.data.success) {
  //     console.log(res.data);
  //     const recentMeasurements = res.data.values;
      
  //   } else {
  //     console.log("unseuccessful");
  //   }
  // };
  useEffect(() => {
    if (isFocused) {
      getRecent();
    }
  }, [isFocused]);

  const getRecent = async () => {
    await client
      .get(`/glucose/getRecentGlucose/${d.getDate()+1}`)
      .then((res) => {
        console.log(res.data.values);
        setRecords(res.data.values);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
return (

    
    <View style={styles.container}>

    <View style={styles.top}>
      
    </View>
        
    <View style={styles.progress}>

    <CircularProgress value={10}/>
    <Text style={styles.glucose}>Blood Glucose Concentration</Text>
    </View>


    <View style={styles.recent}>
      <ListView datalist={records}/>
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
