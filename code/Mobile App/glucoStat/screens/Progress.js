import React from 'react';
import CircularProgress from "../components/ProgressIndicator";

export default function App() {
  return (
    

    <CircularProgress
        value={100}
        radius={100}
        progressValueColor={'#fff'}
        duration={1000}
        strokeColorConfig={[
            
            { color: 'skyblue', value: 0 },
            { color: 'blue', value: 50 },
            { color: 'pink', value: 85 },
            { color: 'red', value: 100 },
        ]}
    />

  );
}
