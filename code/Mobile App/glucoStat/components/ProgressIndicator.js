import React from 'react';

import CircularProgress from 'react-native-circular-progress-indicator';
export default function App({value}) {
  return (
    

    <CircularProgress
    value={value}
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

  );
}
