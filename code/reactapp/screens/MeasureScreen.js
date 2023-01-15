import React, {useEffect, useState} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import BluetoothSerial from 'react-native-bluetooth-serial-next';

import CircularProgress from '../components/ProgressIndicator';
import ListView from '../components/ListView';
import AppBar from '../components/ProfileBar';
import client from '../API/client';

export default function App({navigation}) {
  const isFocused = useIsFocused();
  const [records, setRecords] = useState([{}]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [haveRecords, setHaveRecords] = useState(false);
  const [name, setName] = useState('');
  const [glucoseVal, setglucoseVal] = useState(0);
  const [devices, setdevices] = React.useState([]);
  const [selectedDev, setselectedDev] = React.useState(null);
  // add a user state to change the array auto when screen laoded
  const d = new Date();
  const sendData = async (id, message) => {
    try {
      await BluetoothSerial.device(id).write(message);
    } catch (e) {
      console.log(e.message);
    }
  };

  const connectToBluetooth = () => {
    BluetoothSerial.list().then(v => {
      console.log(v);
      v.forEach(it => {
        if (it.name === 'HC-05') {
          console.log('Connecting');
          BluetoothSerial.connect(it.id)
            .then(con => {
              setselectedDev(con);
              sendData(con.id, 'READY');
              BluetoothSerial.read(
                (data, subscription) => {
                  
                  setglucoseVal(data);
                  addMeasurement(data);

                  
                },
                '\r\n',
                it.id,
              );
            })
            .then(() => {
              
              //addMeasurement();

              
            })
            .catch(e => {
              console.log(e, 'Failed to connect to HC 05');
            });
        }
      });
      setdevices(v);
    });
  };
  // React.useEffect(() => {
  //   connectToBluetooth();
  //   return () => {};
  // }, []);
  useEffect(() => {
    if (isFocused) {
      connectToBluetooth();
      getRecent();
    }
  }, [isFocused]);

  const getRecent = async () => {
    await client
      .get(`/glucose/getRecentGlucose/${d.getDate()}`)
      .then(res => {
        console.log("recent records called")
        setName(res.data.name); // function with timeout
        setRecords(res.data.values);
        console.log(res.data);
        return res.data;
      })
      .then(data => {
        if (data.values.length != 0) {
          setHaveRecords(true);
          console.log('records: ' + records);
          setIsLoaded(true);
        } else {
          console.log('no records');
          setHaveRecords(false);
        }
      })
      .catch(error => {
        
        console.log(error);
      });
  };

  const addMeasurement = async (data) => {
    // check whethr this parameter is working
    // use sync , use a setTimeOut()
    await client
      .post('/glucose/addGlucose', {
        // user_id: 0,
        value: data,
        date: d.getDate(),
        time: d.getTime(),
      })
      .then(res => {
        console.log('read');
        console.log(glucoseVal);
        console.log(res.data);
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
        <CircularProgress value={glucoseVal} />
        <Text style={styles.glucose}>Blood Glucose Concentration</Text>
        <Text style={styles.glucose}>
          {!selectedDev ? 'Not' : ''} Connected to GlucoStat
        </Text>
      </View>

      <View style={styles.recent}>
        {!haveRecords ? (
          <Text> no records to show </Text>
        ) : (
          <ListView datalist={records} />
        )}
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
