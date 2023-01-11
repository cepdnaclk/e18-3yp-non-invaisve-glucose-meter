import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import client from '../API/client';

const ActivityIndicatorExample = () => {
  const [text, setText] = useState('');
  const [animate, setAnimate] = useState(true);
  const [randomDatax, setRandomDatax] = useState([1, 2, 3] ?? 0);
  const [randomDatay, setRandomDatay] = useState([9, 8, 7] ?? 0);
  const [name, setName] = useState('');
  const d = new Date();

  const getData = async () => {
    await client
      .get(`/glucose/getMonthlyGlucose/${d.getMonth() + 1}`)
      .then(res => {
        setName(res.data.name);

        if (res.data.dates.length != 0) {
          //setName(res.data.name);
          
          setRandomDatax(res.data.dates);
          setRandomDatay(res.data.values);
          console.log(res.data.dates);
          // setHighest(Math.max.apply(null, b));
          // setLowest(Math.min.apply(null, b));
        } else {
          console.log('response.data is null');
        }
      })
      .catch(error => {
        console.log('error :' + error);
      });
  };
  useEffect(() => {
    setTimeout(() => {
      getData();
      setText("got values")
      setAnimate(false);
    }, 6000);
  });
  return (
    <View style={styles.activityI}>
      <ActivityIndicator animating={animate} color="red" size="large" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default ActivityIndicatorExample;
const styles = StyleSheet.create({
  activityI: {
    alignContent: 'center',
    margin: 50,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
