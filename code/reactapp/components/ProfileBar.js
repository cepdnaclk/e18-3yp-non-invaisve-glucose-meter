import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {View} from 'react-native';

const MyComponent = ({name}) => (

  <Appbar.Header>
    <Appbar.Content title={name} />
    <Appbar.Action icon="dots-vertical" onPress={() => {}} />
    
  </Appbar.Header>

);

export default MyComponent;
