import React from 'react'
// Routes instead of Switch
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
//import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'



export default function RouterPage() {
  return (
    <div>
        <Router>
            <Routes>
                <Route path="/" element={ <Login/>} />
                <Route path="/Signup" element= { <Signup />} />
                <Route path="/Home" element= { <Home />} />
                
            </Routes>
        </Router>
    </div>
  )
}
