import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import AppBar from '../components/ProfileBar';
import client from '../API/client';
import Button from '../components/RoundButton';

function AddDoctor({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [select, setSelect] = useState(false);
  const [name, setName] = useState('');
  let modalVisible2 = false;
  const isFocused = useIsFocused();
  const doctors = [];
  // const [doctors, setDoctors] = useState([0]);
  const _ids = [];
  let doctorid = null;

  const getDoctors = async () => {
    
    const res = await client.get('/doctor/allDoctors', {}).catch(error => {
      console.log(error.message);
    });
    try {
      res.data.doctors.map(item => {
        setName(res.data.name);
        //console.log(item.username)
        doctors.push(item.username);
        _ids.push(item._id);
      });
    } catch (error) {
      console.log('unexpected: ' + error);
    }
  };

  const addDoc = async () => {
  const res = await client.post('/doctor/subscribeDoc', {
        doctorid,
      })
      .catch(error => {
        
        console.log('error ' + error.message);
      });

  };

  useEffect(() => {
    if (isFocused) {
      getDoctors();
    }
  }, [isFocused]);

  return (
    <View style={styles.viewContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderContent}>
                <Text>doc1</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={styles.modalHeaderCloseText}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.doctorName}></View>
            <Text style={styles.modalText1}>Physician</Text>
            <Text style={styles.modalText2}>Gampaha Base Hospital</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Subscribe</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <AppBar name={name} />
      <View style={styles.scrollViewContainer}>
        <View style={styles.dropdownContainer}>
          <SelectDropdown
            data={doctors}
            onSelect={(selectedItem, index) => {
              setSelect(true);
              doctorid = index;
              //setSelect(true);
              //setModalVisible(true); // ERROR : once selected, the values in dropdown are not loading for the second time
              console.log(selectedItem, index);
            }}
            defaultButtonText={'Select doctor'}
            buttonTextAfterSelection={(selectedItem, index) => {
              // setModalVisible(true);
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#000'}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
            selectedRowStyle={styles.dropdownSelectedRowStyle}
            search
            searchInputStyle={styles.dropdownsearchInputStyleStyle}
            searchInputTxtColor={'#fff'}
            searchPlaceHolder={'Search here'}
            searchPlaceHolderColor={'#F8F8F8'}
            renderSearchInputLeftIcon={() => {
              return <FontAwesome name={'search'} color={'#FFF'} size={18} />;
            }}
            onFocus={() => {}}
            onBlur={() => {}}
          />
        </View>
        {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable> */}
      </View>
      <View style={styles.ButtonContainer}>
        <Button
          iconName={'plus'}
          iconSize={20}
          iconColor={'#fff'}
          onPress={addDoc()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  saveAreaViewContainer: {flex: 1},
  viewContainer: {flex: 1},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30,
    paddingTop: 30,
  },
  dropdownContainer: {flex: 1},
  dropdownBtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#edeff2',
    borderRadius: 8,
  },
  dropdownBtnTxtStyle: {
    color: '#000',
    textAlign: 'left',
    // paddingLeft: 30,
    // fontWeight: "bold",
    fontSize: 13,
  },
  dropdownDropdownStyle: {
    backgroundColor: '#edeff2',
    borderRadius: 12,
    height: '50%',
  },
  dropdownRowStyle: {
    backgroundColor: '#edeff2',
    borderBottomColor: '#C5C5C5',
  },
  dropdownRowTxtStyle: {
    color: '#000',
    textAlign: 'left',
    // paddingLeft: 30,
    // fontWeight: "bold",
  },
  dropdownSelectedRowStyle: {backgroundColor: 'rgba(255,255,255,0.2)'},
  dropdownsearchInputStyleStyle: {
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  progressBarContiner: {
    alignItems: 'center',
    marginBottom: 20,
  },
  percentage: {
    fontSize: 12,
    paddingBottom: 10,
  },
  ButtonContainer: {
    height: 200,
    bottom: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText1: {
    marginBottom: 15,
    fontSize: 20,
    color: 'black',
  },
  modalText2: {
    marginBottom: 15,
    color: 'black',
  },
  modalHeader: {
    flexDirection: 'row',
  },
  /* The header takes up all the vertical space not used by the close button. */
  modalHeaderContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  modalHeaderCloseText: {
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  ButtonContainer: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'flex-end',
  },
});

export default AddDoctor;
