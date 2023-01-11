import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';

import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
  Button,
} from 'react-native';

import LineChart from '../components/LineChart';
import color from '../config/colors';
import client from '../API/client';
import AppBar from '../components/ProfileBar';

const b = [100, 99, 98];

export default function App({navigation}) {
  const [animate, setAnimate] = useState(true);
  // const [randomDatax, setRandomDatax] = useState(
  //   [Math.random() * 100, Math.random() * 100, Math.random() * 100] ?? 0,
  // );

  // const [randomDatay, setRandomDatay] = useState(
  //   [Math.random() * 100, Math.random() * 100, Math.random() * 100] ?? 0,
  // );

  const isFocused = useIsFocused();
  const d = new Date();

  const [dates, setDates] = useState([]);
  const [concs, setValues] = useState([]);
  const [highest, setHighest] = useState(0);
  const [lowest, setLowest] = useState(0);
  const [avg, setAvg] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    if (isFocused) {
      getData();
      setAnimate(false);
    }
  }, [isFocused]);

  const getData = async () => {
    await client
      .get(`/glucose/getMonthlyGlucose/${d.getMonth() + 1}`)
      .then(res => {
        setName(res.data.name);
        
        if (res.data.dates.length != 0) {
          
          setDates(res.data.dates);
          setValues(res.data.values);
          setHighest(Math.max.apply(null, b));
          setLowest(Math.min.apply(null, b));
        } else {
          console.log('res.data.dates.length is 0');
        }
      })
      .catch(error => {
        console.log('error in getData() :' + error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <AppBar name={name} />
      </View>

      <View style={styles.chart}>
        <ActivityIndicator animating={animate} color="red" size="large" />
        <LineChart
          x_datalist={dates}
          y_datalist={concs}
          x_unit={' mgH'}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Refresh Data"
          color={color.primary}
          onPress={refresh_data}
        />
      </View>

      <View style={styles.params}>
        <View style={styles.first}>
          <Text style={styles.text1}> Highest </Text>
          <Text style={styles.text2}> {highest} </Text>
          <Text style={styles.text3}> mg/dL </Text>
        </View>
        <View style={styles.first}>
          <Text style={styles.text1}> Average </Text>
          <Text style={styles.text2}> 100 </Text>
          <Text style={styles.text3}> mg/dL </Text>
        </View>
        <View style={styles.first}>
          <Text style={styles.text1}> Lowest </Text>
          <Text style={styles.text2}> {lowest} </Text>
          <Text style={styles.text3}> mg/dL </Text>
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
    flex: 0.5,
  },

  chart: {
    paddingLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  params: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingLeft: 30,
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
  },
  first: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topics: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 15,
    fontWeight: 'bold',
    color: color.primary,
  },
  value: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  unit: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text1: {
    margin: 10,
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  text2: {
    color: color.primary,
    fontSize: 30,
    fontWeight: 'bold',
  },
  text3: {
    color: '#000',
  },
});

// <View style={styles.first}>
//       <Text style={styles.topics}> Monthly Average </Text>
//       <Text style={styles.date}> {d.toLocaleString('default', { month: 'long' })} </Text>
//       {/* WRONG */}
//       <Text style={styles.value}> 127 <Text style={styles.unit}> mgH </Text> </Text>

//     </View>

//     <View style={styles.second}>
//     <View style={styles.up}>
//       <Text style={styles.topics}> Highest </Text>
//       {/* WRONG */}
//       <Text style={styles.date}> 22/12/2022 </Text>
//       <Text style={styles.value}> {highest} <Text style={styles.unit}> mgH </Text></Text>

//       </View>
//       <View style={styles.down}>
//       <Text style={styles.topics}> Lowest </Text>
//       {/* WRONG */}
//       <Text style={styles.date}> 03/12/2022 </Text>
//       <Text style={styles.value}> {lowest} <Text style={styles.unit}> mgH </Text> </Text>

//     </View>

//     </View>
