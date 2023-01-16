 import React from "react";
 import * as Components from './Pages/Components';
 import Authentication from "./Pages/Authentication";
 import Dashboard from "./Pages/Dashboard";
 import Requests from "./Pages/Requests";
 import { Routes, Route } from 'react-router-dom';

 function App() {

      return(
          <div className="App">
          <Routes>
            <Route path="/" element={<Authentication />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="requests" element={<Requests />} />
          </Routes>
        </div>
       
      )
 }

 export default App;