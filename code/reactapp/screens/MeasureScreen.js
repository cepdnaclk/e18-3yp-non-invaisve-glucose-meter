import React, {useEffect, useState} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import CircularProgress from '../components/ProgressIndicator';
import ListView from '../components/ListView';
import AppBar from '../components/ProfileBar';
import client from '../API/client';

export default function App({navigation}) {
  const isFocused = useIsFocused();
  const [records, setRecords] = useState([{}]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState('');
  // add a user state to change the array auto when screen laoded
  const d = new Date();
  console.log(d.getDate());

  useEffect(() => {
    if (isFocused) {
      getRecent();
    }
  }, [isFocused]);

  const getRecent = async () => {
    await client
      .get(`/glucose/getRecentGlucose/${d.getDate()}`)
      .then(res => {
        setName(res.data.name);
        if (res.data.values.length != 0) {
          console.log(res.data.values.length);
          
          setRecords(res.data.values);
          console.log(res.data);
          setIsLoaded(true);}
        // } else {
        //   setRecords({_id: '0', msg: 'no data to show'});
        // }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <AppBar name={name} />
      </View>

      <View style={styles.progress}>
        <CircularProgress value={96} />
        <Text style={styles.glucose}>Blood Glucose Concentration</Text>
      </View>

      <View style={styles.recent}>
        <ListView datalist={records} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8fa5e3',
  },
  name: {
    fontSize: 25,
    color: '#000',
  },

  top: {
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
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  glucose: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    marginTop: 12,
    fontWeight: 'bold',
    color: '#000',
  },
});
