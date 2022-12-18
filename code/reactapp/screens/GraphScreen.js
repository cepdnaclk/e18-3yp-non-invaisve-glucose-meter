import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';

import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

import LineChart from '../components/LineChart';
import color from '../config/colors';
import client from '../API/client';

export default function App({navigation}) {
  const isFocused = useIsFocused();
  const d = new Date();
  const [dates, setDates] = useState([0]);
  const [concs, setValues] = useState([0]);
  const [highest, setHighest] = useState(0);
  const [lowest, setLowest] = useState(0);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  const getData = async () => {
    await client
      .get(`/glucose/getMonthlyGlucose/${d.getMonth() + 1}`)
      .then(res => {
        console.log(res.data);
        if (res.data.dates.length != 0) {
          setDates(res.data.dates);
          setValues(res.data.values);
          setHighest(Math.max.apply(null, res.data.values));
          setLowest(Math.min.apply(null, res.data.values));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}></View>

      <View style={styles.chart}>
        <LineChart x_datalist={dates} y_datalist={concs} x_unit={' mgH'} />
      </View>

      <View style={styles.params}>
        <Text style={styles.text}> Average 127 mgH</Text>
        <Text style={styles.text}>
          {' '}
          Highest <Text style={styles.text2}> (12/17/2022) </Text> {highest} mgH{' '}
        </Text>
        <Text style={styles.text}>
          Lowest <Text style={styles.text2}> (12/17/2022) </Text> {lowest} mgH
        </Text>
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
    flexDirection: 'column',
  },
  first: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 10,
    marginLeft: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  second: {
    flex: 1,
    flexDirection: 'column',
  },
  up: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  down: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 20,
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
  text: {
    paddingBottom: 23,
    fontSize: 20,
    color: '#000',
  },
  text2: {
    color: color.primary,
    fontWeight: 'bold',
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
