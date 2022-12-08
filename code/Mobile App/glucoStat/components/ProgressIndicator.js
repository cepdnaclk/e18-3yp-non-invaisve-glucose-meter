import React from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

import CircularProgress from 'react-native-circular-progress-indicator';

export default function App() {
  return (
    <View style={styles.container}>
        
    <View style={styles.progress}>

    <CircularProgress
    value={100}
    radius={100}
    progressValueColor={'#fff'}
    duration={1000}
    strokeColorConfig={[
        
        { color: 'skyblue', value: 0 },
        { color: 'blue', value: 30 },
        { color: 'pink', value: 60 },
        { color: 'red', value: 80 },
    ]}
    progressValueColor={"black"}
/>
    </View>

    <View style={styles.recent}></View>
    
    </View>

    

  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#8fa5e3",
    },

    progress: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
    },
    recent: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 3,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

  
  });
