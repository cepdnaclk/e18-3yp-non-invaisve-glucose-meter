import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import RequestList from '../components/RequestList';
import { Link, useNavigate } from 'react-router-dom'


function Requests(){


    const [isLoading, setLoading] = useState(false);
    const [apiResponse,setapiResponse] = useState("");


    useEffect(() => {
        if (isLoading) {
            console.log("req sent")
            let at = sessionStorage.getItem("accesstoken");
            axios.get("http://52.221.105.255:3000/api/admin/doctorRequests",{
             headers: {
                Authorization: `Bearer ${at}`
            }
            })
            .then((Response)=>{
                console.log("req",Response.data);
                setapiResponse(Response.data);
                setLoading(false);
                  // React.createElement(<h1> hello2</h1>
                // console.log(req)
                // document.getElementById('req').appendChild(req);
                //ReactDOM.render(req,document.getElementById('req'))
            })
            .catch((e)=>console.log(e)) 
        }
      }, [isLoading]);
    
      const handleClick = () => {
        setLoading(true);
        document.getElementById('requests').style.display ="block";
      }





    return(


        <div>

            <nav class="navbar bg-primary navbar-expand-lg" data-bs-theme="dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">glucoStat</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Requests</a>
                        </li>
                        {/* <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link disabled">Disabled</a>
                        </li> */}
                    </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button type="button" class="btn btn-outline-light" >Search</button>
                        <button type="button" class="btn btn-dark">10</button>

                    </form>
                    </div>
                </div>

            </nav>

           
            <section className="requests mb-3 mt-2" >
                <h1 className='reqH1'>Requests</h1>
                <button className="btn btn-primary btn-lg"  disabled={isLoading}
                    onClick={!isLoading ? handleClick : null} >
                     {isLoading ? 'Loading…' : 'Click to load'}
                </button>


                
            </section>
            <div id='requests'>
                {RequestList(apiResponse)}
                        
            </div>



        </div>
    )

}
export default Requests;