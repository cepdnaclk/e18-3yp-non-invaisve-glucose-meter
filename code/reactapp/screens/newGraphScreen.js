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

const a = [100, 99, 98];
const b = [100, 99, 98];

export default function App({navigation}) {
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
    }
  }, [isFocused]);

  const getData = async () => {
    await client
      .get(`/glucose/getMonthlyGlucose/${d.getMonth() + 1}`)
      .then(res => {
        console.log('monthly glucose called ..');
        console.log(res.data);

        return res.data;
      })
      .then(data => {
        setName(data.name);
        setDates(data.dates);
        setValues(data.values);
        return data;
      })
      .then(data2 => {
        setHighest(Math.max.apply(null, concs));
        setLowest(Math.min.apply(null, concs));
      })
      .catch(error => {
        console.log('error in getData() :' + error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <AppBar name={'name'} />
      </View>

      <View style={styles.chart}>
        <LineChart x_datalist={a} y_datalist={b} x_unit={' mgH'} />
      </View>

      <View style={styles.params}>
        <View style={styles.first}>
          <Text style={styles.text1}> Highest </Text>
          <Text style={styles.text2}> 53 </Text>
          <Text style={styles.text3}> mg/dL </Text>
        </View>
        <View style={styles.first}>
          <Text style={styles.text1}> Average </Text>
          <Text style={styles.text2}> 100 </Text>
          <Text style={styles.text3}> mg/dL </Text>
        </View>
        <View style={styles.first}>
          <Text style={styles.text1}> Lowest </Text>
          <Text style={styles.text2}> 543 </Text>
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
